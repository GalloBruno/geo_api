export const getAllAirports = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/GalloBruno/geo_api@master/assets/world-airports.json'
  );
  const airports = await response.json();
  const filteredAirports = Object.keys(airports)
    .map((key) => {
      const { iata, name, city, state, country, lat, lon } = airports[key];
      return iata ? { iata, name, city, state, country, lat, lon } : null;
    })
    .filter(Boolean);
  return filteredAirports;
};
