/**
 * Get All Airports (Worldwide)
 * 
 * Fetches worldwide airports data from jsDelivr CDN.
 * Filters out airports without IATA codes for better data quality.
 * 
 * @returns {Promise<Array>} Array of airport objects with IATA codes
 * 
 * @example
 * const airports = await getAllAirports();
 * // Returns: [{ iata, name, city, state, country, lat, lon }, ...]
 */
export const getAllAirports = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/GalloBruno/geo_api@master/public/assets/world-airports.json'
  );
  const airports = await response.json();

  // Filter airports to only include those with IATA codes
  const filteredAirports = Object.keys(airports)
    .map((key) => {
      const { iata, name, city, state, country, lat, lon } = airports[key];
      return iata ? { iata, name, city, state, country, lat, lon } : null;
    })
    .filter(Boolean); // Remove null entries

  return filteredAirports;
};
