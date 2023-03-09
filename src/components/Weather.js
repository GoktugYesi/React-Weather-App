import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../api/fetchWeather';

function Weather() {
    const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query, latitude, longitude);
      setWeather(data);
      setQuery('');
    }
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const getWeatherByCoords = async () => {
        const data = await fetchWeather(null, latitude, longitude);
        setWeather(data);
      };

      getWeatherByCoords();
    }
  }, [latitude, longitude]);

        return (
            <>
              <input type="text" className="search" placeholder="Ara..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}
              />
              {weather.main && (
                <div className="city">
                  <h2 className="city-name">
                    <span>{weather.name}</span>
                    <sup>{weather.sys.country}</sup>
                  </h2>
                  <div className="city-temp">
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                  </div>
                  <div className="info">
                    <img
                      className="city-icon"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].description}
                    />
                  </div>
                </div>
              )}
              {error && <div className="error-message">{error}</div>}
            </>
          );
    
}

export default Weather;