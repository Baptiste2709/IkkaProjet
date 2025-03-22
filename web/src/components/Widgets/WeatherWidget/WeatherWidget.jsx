import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeatherWidget.css';

// Constantes
const API_KEY = 'd437461be3d642bfc499e30d05b5c037'; // À remplacer par votre clé API OpenWeather
const DEFAULT_LOCATION = { lat: 48.85120340019094, lon: 2.288095154715591, name: 'France' }; // Position par défaut (Chine)

// Données fictives des capteurs
const MOCK_SENSOR_DATA = [
  { type: 'temperature', value: 23, creationDate: new Date(Date.now() - 1000 * 60 * 30).toISOString() }, // 30 minutes dans le passé
  { type: 'temperature', value: 22, creationDate: new Date(Date.now() - 1000 * 60 * 90).toISOString() }, // 1h30 dans le passé
  { type: 'temperature', value: 21, creationDate: new Date(Date.now() - 1000 * 60 * 150).toISOString() }, // 2h30 dans le passé
  { type: 'humidity', value: 65, creationDate: new Date(Date.now() - 1000 * 60 * 20).toISOString() }, // 20 minutes dans le passé
  { type: 'humidity', value: 63, creationDate: new Date(Date.now() - 1000 * 60 * 80).toISOString() }, // 1h20 dans le passé
  { type: 'humidity', value: 60, creationDate: new Date(Date.now() - 1000 * 60 * 140).toISOString() }, // 2h20 dans le passé
  { type: 'airPollution', value: 42, creationDate: new Date(Date.now() - 1000 * 60 * 25).toISOString() }, // 25 minutes dans le passé
  { type: 'airPollution', value: 45, creationDate: new Date(Date.now() - 1000 * 60 * 85).toISOString() }, // 1h25 dans le passé
  { type: 'airPollution', value: 47, creationDate: new Date(Date.now() - 1000 * 60 * 145).toISOString() }, // 2h25 dans le passé
];

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparison, setComparison] = useState({ temp: 0, humidity: 0 });

  // Récupérer la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Votre position'
          });
        },
        (error) => {
          console.log('Utilisation de la position par défaut:', error.message);
          // La position par défaut est déjà définie
        }
      );
    }
  }, []);

  // Récupérer les données météo actuelles
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        
        // Récupérer les prévisions
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        
        // Formater les données pour Recharts (prendre les prochaines 24h)
        const formatted = forecastResponse.data.list.slice(0, 8).map(item => ({
          time: new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity
        }));
        
        setForecastData(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données météo:', err);
        setError('Impossible de récupérer les données météo. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  // Comparer avec les données des capteurs
  useEffect(() => {
    if (weatherData) {
      // Récupérer les données les plus récentes des capteurs fictifs
      const latestTempSensor = MOCK_SENSOR_DATA
        .filter(item => item.type === 'temperature')
        .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))[0];
      
      const latestHumiditySensor = MOCK_SENSOR_DATA
        .filter(item => item.type === 'humidity')
        .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))[0];
      
      // Calculer la différence
      const tempDiff = latestTempSensor 
        ? Math.round((latestTempSensor.value - weatherData.main.temp) * 10) / 10
        : 0;
      
      const humidityDiff = latestHumiditySensor 
        ? Math.round(latestHumiditySensor.value - weatherData.main.humidity)
        : 0;
      
      setComparison({ temp: tempDiff, humidity: humidityDiff });
    }
  }, [weatherData]);

  if (loading) return (
    <div className="weather-widget">
      <div className="weather-loading">
        <div className="spinner"></div>
        <p>Chargement des données météo...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="weather-widget error">
      <h3>Erreur</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Réessayer</button>
    </div>
  );

  if (!weatherData) return null;

  const weatherIcon = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div className="weather-widget">
      <div className="widget-header">
        <h3>Météo actuelle</h3>
        <span className="location">{weatherData.name || location.name}</span>
      </div>
      
      <div className="current-weather">
        <div className="weather-main">
          <img src={iconUrl} alt={weatherData.weather[0].description} className="weather-icon" />
          <div className="temp-container">
            <span className="temperature">{Math.round(weatherData.main.temp)}°C</span>
            <span className="description">{weatherData.weather[0].description}</span>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidité:</span>
            <span className="detail-value">{weatherData.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Vent:</span>
            <span className="detail-value">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pression:</span>
            <span className="detail-value">{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>
      
      <div className="sensor-comparison">
        <h4>Comparaison avec nos capteurs</h4>
        <div className="comparison-row">
          <div className={`comparison-item ${comparison.temp > 2 || comparison.temp < -2 ? 'alert' : ''}`}>
            <span className="comparison-label">Température:</span>
            <span className="comparison-value">
              {comparison.temp > 0 ? '+' : ''}{comparison.temp}°C 
              {comparison.temp === 0 ? ' (identique)' : comparison.temp > 0 ? ' (plus chaud)' : ' (plus froid)'}
            </span>
          </div>
          <div className={`comparison-item ${comparison.humidity > 10 || comparison.humidity < -10 ? 'alert' : ''}`}>
            <span className="comparison-label">Humidité:</span>
            <span className="comparison-value">
              {comparison.humidity > 0 ? '+' : ''}{comparison.humidity}% 
              {comparison.humidity === 0 ? ' (identique)' : comparison.humidity > 0 ? ' (plus humide)' : ' (plus sec)'}
            </span>
          </div>
        </div>
      </div>
      
      {forecastData && (
        <div className="forecast">
          <h4>Prévisions sur 24h</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecastData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#ddd" />
              <YAxis yAxisId="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#8884d8" name="Température (°C)" />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidité (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;