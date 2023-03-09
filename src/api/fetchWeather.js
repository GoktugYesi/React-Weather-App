import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async (query, latitude, longitude) => {
  let url = URL;
  let params = {};

  if (query) {
    params = {
      q: query,
    };
  } else if (latitude && longitude) {
    params = {
      lat: latitude,
      lon: longitude,
    };
  }

  params = {
    ...params,
    units: 'metric',
    APPID: API_KEY,
  };

  const { data } = await axios.get(url, { params });

  return data;
}