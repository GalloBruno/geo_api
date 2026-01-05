/**
 * Location Information Extractor
 * 
 * Extracts geolocation data from Vercel's request headers.
 * Vercel automatically adds geolocation headers to all requests when deployed.
 * 
 * Headers used:
 * - x-vercel-ip-city: City name
 * - x-vercel-ip-country: Country code (ISO 3166-1 alpha-2)
 * - x-vercel-ip-latitude: Latitude
 * - x-vercel-ip-longitude: Longitude
 * - x-vercel-ip-timezone: Timezone
 * - x-vercel-ip-postal-code: Postal code
 * 
 * Also extracts browser and system information from request headers.
 */

import { getCountryFlag } from '../utils/convert-to-flag.js'
import { checkIfUndefined } from '../utils/set-undefined.js'

/**
 * Extract Location Information from Request
 * 
 * Parses Vercel geolocation headers and browser information from the request.
 * Provides fallback values for local development when Vercel headers are not available.
 * 
 * @param {Request} req - Express request object with Vercel headers
 * @returns {Object} Comprehensive location and system information
 * 
 * @example
 * const locationInfo = extractLocationInfo(req);
 * // Returns: {
 * //   ip: "123.456.789.0",
 * //   city: { name: "Buenos Aires", postalCode: 1000 },
 * //   country: { name: "Argentina", alpha: "AR", emojiFlag: "🇦🇷", ... },
 * //   coords: { latitude: -34.6037, longitude: -58.3816 },
 * //   sysInfo: { system: "Windows", webBrowser: { ... } }
 * // }
 */
const extractLocationInfo = (req) => {
  // Extract client IP from various possible headers
  const clientIp =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress

  // Extract Vercel geolocation headers
  const cityName = req.headers['x-vercel-ip-city']
  const country = req.headers['x-vercel-ip-country']
  const postalCode = req.headers['x-vercel-ip-postal-code']
  const latitude = req.headers['x-vercel-ip-latitude']
  const longitude = req.headers['x-vercel-ip-longitude']
  const timeZone = req.headers['x-vercel-ip-timezone']
  const countryName = timeZone?.split('/')?.[1] || 'No Disponible'

  // Extract browser and system information
  const platform = req.headers['sec-ch-ua-platform']
  const userInfo = req.headers['sec-ch-ua']
  const regex = /"([^"]+)";v="(\d+)"/
  const webBrowser = userInfo?.split('\n')?.[0].split(',')[0] || 'No disponible'
  const match = webBrowser.match(regex)

  /**
   * Format Browser Info
   * Removes parentheses and semicolons from browser strings
   */
  function formatBrowserInfo(text = '') {
    if (text.includes(')') && text.includes(';')) {
      return text.replace(')', ' ').replace(';', ' ')
    } else {
      return text
    }
  }

  return {
    ip: clientIp,
    city: {
      name: cityName ? decodeURIComponent(cityName) : 'No disponible',
      postalCode: postalCode || 5770, // Default: Villa Mercedes, San Luis
    },
    country: {
      name: countryName,
      alpha: country || 'AR', // Default: Argentina
      emojiFlag: getCountryFlag({ countryCode: country }),
      timezone: timeZone || 'America/Argentina/San_Luis',
    },
    coords: {
      latitude: latitude || -33.2991,  // Default: Villa Mercedes coordinates
      longitude: longitude || -66.3547,
    },
    sysInfo: {
      language: checkIfUndefined(navigator.language),
      system: platform ? platform.replace(/\"/g, '') : 'No Disponible' || null,
      webBrowser: {
        browser: formatBrowserInfo(match?.[1]) ?? 'No disponible',
        version: match?.[2] ?? 'No Disponible',
      },
    },
  }
}

export default extractLocationInfo
