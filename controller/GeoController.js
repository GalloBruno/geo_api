/**
 * Geo Controller
 * 
 * Handles all geolocation-related HTTP requests including:
 * - IP-based location detection (using Vercel headers)
 * - Coordinate-based location queries
 * - Interactive UI pages
 * - API documentation
 * 
 * All location data is stored in Supabase for analytics.
 */

import extractLocationInfo from '../services/get-location-info.js'
import supabase from '../utils/supabase.js'
import { mainView } from '../views/main-view.js'
import { getAllAirports } from '../services/get-airports.js'
import { getAllCitiesAR } from '../services/get-cities.js'
import { getClosestPlace } from '../services/closest-airport.js'
import { docsView } from '../views/docs.js'

export class GeoController {
  /**
   * Home Page - Interactive Geolocation UI
   * 
   * Displays an interactive page showing the user's location based on their IP.
   * Uses Vercel's geolocation headers to extract location data.
   * 
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {HTML} Interactive HTML page with location information
   */
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

  /**
   * Location API Endpoint
   * 
   * Returns location data as JSON based on the client's IP address.
   * Logs visitor data to Supabase for analytics purposes.
   * 
   * @param {Request} req - Express request object with Vercel headers
   * @param {Response} res - Express response object
   * @returns {JSON} Location data including city, country, coordinates, and system info
   * 
   * @example
   * GET /location
   * Response: {
   *   ip: "123.456.789.0",
   *   city: { name: "Buenos Aires", postalCode: 1000 },
   *   country: { name: "Argentina", alpha: "AR", ... },
   *   coords: { latitude: -34.6037, longitude: -58.3816 },
   *   sysInfo: { ... }
   * }
   */
  static async location(req, res) {
    try {
      const locationInfo = extractLocationInfo(req)
      if (!locationInfo) {
        res
          .status(404)
          .json({ message: 'No se encontró la ubicación requerida.' })
      }

      // Extract request metadata for analytics
      const origin = req.headers.origin || 'sin Origin'
      const referer = req.headers.referer || 'sin Referer'

      // Prepare visitor data for Supabase
      const api_visitor = {
        ip: locationInfo.ip,
        city: locationInfo.city.name,
        country: locationInfo.country.name,
        system: locationInfo.sysInfo.system,
        host_url: `${origin}${referer ? ` - ${referer}` : 'No disponible'}`,
      }

      // Log visitor to Supabase
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

  /**
   * Geolocation by Coordinates
   * 
   * Finds the closest city and airport to given latitude/longitude coordinates.
   * Uses the Haversine formula to calculate distances.
   * Logs all requests to Supabase for analytics.
   * 
   * @param {Request} req - Express request with lat and lon query parameters
   * @param {Response} res - Express response object
   * @returns {JSON} Detailed location data including closest city and airport
   * 
   * @example
   * GET /geolocation?lat=-33.0548161&lon=-65.6174943
   * Response: {
   *   ip: "123.456.789.0",
   *   city: "Villa Mercedes",
   *   state: "San Luis",
   *   country: "Argentina",
   *   centerSquare: "5.366mts",
   *   coordinates: { latitude: -33.0548, longitude: -65.6175 },
   *   closestAirport: { name: "...", distance: "17.116mts", ... }
   * }
   */
  static async geolocation(req, res) {
    const { lat, lon } = req.query

    // Validate required parameters
    if (!lat || !lon) {
      res.status(400).json({
        message: 'Debes proporcionar los parámetros de latitud y longitud',
      })
      return
    }

    const coordinates = { lat, lon }

    try {
      // Fetch cities and airports data in parallel for better performance
      const [cities, airports] = await Promise.all([
        getAllCitiesAR(),
        getAllAirports(),
      ])

      // Find closest city using Haversine formula
      const { closestTarget, minDistance } = getClosestPlace(
        coordinates,
        cities
      )
      const { nombre, tipo, departamento, provincia, pais, lat, lon } =
        closestTarget

      // Find closest airport
      const { closestTarget: airport, minDistance: distance } = getClosestPlace(
        coordinates,
        airports
      )

      // Extract client IP from various possible headers
      const clientIp =
        req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress

      const locationInfo = extractLocationInfo(req)

      // Prepare data for Supabase analytics
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

      // Log geolocation request to Supabase
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

      // Return detailed location information
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

  /**
   * API Documentation Page
   * 
   * Renders an interactive HTML documentation page with API usage examples,
   * endpoint descriptions, and code samples.
   * 
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {HTML} API documentation page
   */
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
