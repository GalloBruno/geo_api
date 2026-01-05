/**
 * Closest Place Finder using Haversine Formula
 * 
 * Calculates distances between coordinates using the Haversine formula,
 * which accounts for the Earth's curvature to provide accurate geodesic distances.
 * 
 * The Haversine formula determines the great-circle distance between two points
 * on a sphere given their longitudes and latitudes.
 */

// Earth's radius in meters
const EARTH_RADIUS = 6378137

// Helper functions
const square = (num) => num * num
const degreesToRadians = (degrees) => (degrees * Math.PI) / 180.0

/**
 * Haversine Distance Calculator
 * 
 * Calculates the distance between two geographic points using the Haversine formula.
 * Returns distance in kilometers.
 * 
 * @param {Object} pointA - First point with lat/latitude and lon/longitude
 * @param {Object} pointB - Second point with lat/latitude and lon/longitude
 * @returns {number} Distance in kilometers
 * 
 * @example
 * const distance = haversine(
 *   { lat: -33.0548, lon: -65.6175 },
 *   { lat: -34.6037, lon: -58.3816 }
 * );
 * // Returns: ~570.5 (km)
 */
const haversine = (pointA, pointB) => {
  // Convert coordinates to radians
  const latitudeA = degreesToRadians(pointA.lat || pointA.latitude)
  const latitudeB = degreesToRadians(pointB.lat || pointB.latitude)
  const longitudeA = degreesToRadians(pointA.lon || pointA.longitude)
  const longitudeB = degreesToRadians(pointB.lon || pointB.longitude)

  // Haversine formula
  const haversine =
    square(Math.sin((latitudeB - latitudeA) / 2)) +
    Math.cos(latitudeA) *
    Math.cos(latitudeB) *
    square((longitudeB - longitudeA) / 2)

  const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(haversine))

  return distance / 1000 // Convert meters to kilometers
}

/**
 * Find Closest Place
 * 
 * Finds the closest location from an array of places to given coordinates.
 * Iterates through all locations and calculates distances using Haversine formula.
 * 
 * @param {Object} coordinates - Target coordinates { lat, lon }
 * @param {Array} allData - Array of location objects with lat/lon properties
 * @returns {Object} Object with closestTarget and minDistance in km
 * 
 * @example
 * const result = getClosestPlace(
 *   { lat: -33.0548, lon: -65.6175 },
 *   cities
 * );
 * // Returns: { closestTarget: {...}, minDistance: 5.366 }
 */
export const getClosestPlace = (coordinates, allData) => {
  let closestTarget = null
  let minDistance = Infinity

  // Iterate through all locations to find the closest one
  for (const data of allData) {
    const meters = haversine(coordinates, data)

    if (meters < minDistance) {
      minDistance = meters
      closestTarget = data
    }
  }

  return { closestTarget, minDistance }
}
