/**
 * Get All Cities (Argentina)
 * 
 * Fetches Argentine cities data from jsDelivr CDN.
 * The data is served from the GitHub repository via CDN for better performance.
 * 
 * Data includes: city name, type, department, province, country, and coordinates.
 * 
 * @returns {Promise<Array>} Array of city objects with location data
 * 
 * @example
 * const cities = await getAllCitiesAR();
 * // Returns: [{ id, nombre, tipo, departamento, provincia, pais, lat, lon }, ...]
 */
const getAllCitiesAR = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/GalloBruno/geo_api@master/assets/geo-data.json'
  );
  const jsonData = await response.json();

  // Transform object keys to array format
  const formatJSON = Object.keys(jsonData).map((key) => {
    const { id, nombre, tipo, departamento, provincia, pais, lat, lon } =
      jsonData[key];
    return {
      id,
      nombre,
      tipo,
      departamento,
      provincia,
      pais,
      lat,
      lon,
    };
  });
  return formatJSON;
};

export { getAllCitiesAR };
