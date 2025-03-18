// WeatherWidget.jsx
// Ce widget utilise l'API OpenWeather pour afficher les données météo
// d'une ville spécifiée. L'appel à l'API est fait via le backend
// pour protéger la clé API.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ city = 'Paris', country = 'FR' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // L'appel se fait via notre backend pour protéger la clé API
        const response = await axios.get(`/api/weather?city=${city}&country=${country}`);
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les données météo');
        setLoading(false);
        console.error('Error fetching weather data:', err);
      }
    };

    fetchWeather();
    // Rafraîchir les données toutes les 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [city, country]);
  
  // Service côté serveur pour récupérer les données météo
  // server/services/weatherApi.js
  /*
  const axios = require('axios');
  require('dotenv').config();

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  exports.getWeatherByCity = async (city, country) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: `${city},${country}`,
          appid: API_KEY,
          units: 'metric',
          lang: 'fr'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
  */

  // Fonction pour récupérer l'icône correspondant à la météo
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Météo</h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Météo</h2>
        <div className="flex justify-center items-center h-32 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Météo à {city}</h2>
      
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description} 
            className="w-16 h-16"
          />
        </div>
        
        <div className="ml-4">
          <div className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</div>
          <div className="capitalize text-gray-600">{weather.weather[0].description}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div>
          <span className="text-gray-500">Humidité</span>
          <div>{weather.main.humidity}%</div>
        </div>
        <div>
          <span className="text-gray-500">Vent</span>
          <div>{Math.round(weather.wind.speed * 3.6)} km/h</div>
        </div>
        <div>
          <span className="text-gray-500">Min</span>
          <div>{Math.round(weather.main.temp_min)}°C</div>
        </div>
        <div>
          <span className="text-gray-500">Max</span>
          <div>{Math.round(weather.main.temp_max)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;