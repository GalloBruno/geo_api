import extractLocationInfo from '../services/get-location-info.js'
import supabase from '../utils/supabase.js'
import { mainView } from '../views/main-view.js'
import { getAllAirports } from '../services/get-airports.js'
import { getAllCitiesAR } from '../services/get-cities.js'
import { getClosestPlace } from '../services/closest-airport.js'
import { docsView } from '../views/docs.js'

export class GeoController {
  static async home(req, res) {
    try {
      const locationInfo = extractLocationInfo(req)

      res.status(200).send(
        mainView({
          data: locationInfo,
          latitude: locationInfo.coords.latitude,
          longitude: locationInfo.coords.longitude,
        })
      )
    } catch (error) {
      res.send('Server error: ' + error)
    }
  }

  static async location(req, res) {
    try {
      const locationInfo = extractLocationInfo(req)
      if (!locationInfo) {
        res
          .status(404)
          .json({ message: 'No se encontró la ubicación requerida.' })
      }
      const origin = req.headers.origin || 'sin Origin'
      const referer = req.headers.referer || 'sin Referer'

      const api_visitor = {
        ip: locationInfo.ip,
        city: locationInfo.city.name,
        country: locationInfo.country.name,
        system: locationInfo.sysInfo.system,
        host_url: `${origin}${referer ? ` - ${referer}` : 'No disponible'}`,
      }

      try {
        const { error } = await supabase
          .from('geo_api_visitor')
          .insert([api_visitor])
        if (error) throw new Error(error.message)
      } catch (err) {
        throw new Error('Cannot send data to supabase: ' + err.message)
      }

      res.status(200).json(locationInfo)
    } catch (err) {
      res.status(500).json({ message: 'Server Error ' + err })
    }
  }

  static async geolocation(req, res) {
    const { lat, lon } = req.query
    if (!lat || !lon) {
      res.status(400).json({
        message: 'Debes proporcionar los parámetros de latitud y longitud',
      })
      return
    }
    const coordinates = { lat, lon }
    try {
      const [cities, airports] = await Promise.all([
        getAllCitiesAR(),
        getAllAirports(),
      ])
      const { closestTarget, minDistance } = getClosestPlace(
        coordinates,
        cities
      )
      const { nombre, tipo, departamento, provincia, pais, lat, lon } =
        closestTarget
      const { closestTarget: airport, minDistance: distance } = getClosestPlace(
        coordinates,
        airports
      )
      const clientIp =
        req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress
      const locationInfo = extractLocationInfo(req)

      const preparedStatements = {
        ip: clientIp,
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        city_name: nombre,
        country_name: pais,
        departament: departamento,
        closest_airport: airport.name,
        airport_distance: `${distance.toFixed(3) || 0}mts`,
        state: provincia,
        center_square_distance: `${minDistance.toFixed(3) || 0}mts`,
        so: locationInfo.sysInfo.system || 'No disponible',
      }

      try {
        const { error } = await supabase
          .from('geolocation_requests')
          .insert([preparedStatements])
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        res.send('Cannot send data to DB: ' + error.message)
      }

      res.status(200).json({
        ip: clientIp,
        city: nombre,
        type: tipo,
        departament: departamento,
        state: provincia,
        country: pais,
        centerSquare: `${minDistance.toFixed(3) || 0}mts`,
        coordinates: {
          latitude: lat,
          longitude: lon,
        },
        closestAirport: {
          iata: airport.iata,
          name: airport.name,
          city: airport.city,
          state: airport.state,
          country: airport.country,
          latitude: airport.latitude,
          longitude: airport.longitude,
          distance: `${distance.toFixed(3) || 0}mts`,
        },
      })
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error })
    }
  }

  static async docs(req, res) {
    try {
      const locationInfo = extractLocationInfo(req)
      if (!locationInfo) {
        return res
          .status(404)
          .json({ message: 'Información de ubicación no encontrada' })
      }
      res.status(400).send(docsView(locationInfo))
    } catch (error) {
      res.status(500).json('Server error:', error)
    }
  }
}
