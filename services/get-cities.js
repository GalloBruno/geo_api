const getAllCitiesAR = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/GalloBruno/geo_api@master/assets/geo-data.json'
  );
  const jsonData = await response.json();
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
