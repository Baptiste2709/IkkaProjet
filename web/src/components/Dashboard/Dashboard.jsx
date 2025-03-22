// web/src/components/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';
import SensorGeoDistributionWidget from '../Widgets/SensorGeoDistributionWidget/SensorGeoDistributionWidget';
import MeasurementTrendsWidget from '../Widgets/MeasurementTrendsWidget/MeasurementTrendsWidget';
import WeatherWidget from '../Widgets/WeatherWidget/WeatherWidget';

// Données fictives pour le dashboard
const MOCK_MEASUREMENTS = [
  // Mesures de température
  { id: 't1', type: 'temperature', value: 22, creationDate: new Date(2024, 2, 22).toISOString(), sensorID: 'sensor-1' },
  { id: 't2', type: 'temperature', value: 23, creationDate: new Date(2024, 2, 21).toISOString(), sensorID: 'sensor-2' },
  { id: 't3', type: 'temperature', value: 24, creationDate: new Date(2024, 2, 20).toISOString(), sensorID: 'sensor-3' },
  { id: 't4', type: 'temperature', value: 21, creationDate: new Date(2024, 2, 19).toISOString(), sensorID: 'sensor-1' },
  { id: 't5', type: 'temperature', value: 20, creationDate: new Date(2024, 2, 18).toISOString(), sensorID: 'sensor-2' },
  { id: 't6', type: 'temperature', value: 19, creationDate: new Date(2024, 2, 17).toISOString(), sensorID: 'sensor-3' },
  { id: 't7', type: 'temperature', value: 18, creationDate: new Date(2024, 2, 16).toISOString(), sensorID: 'sensor-1' },
  { id: 't8', type: 'temperature', value: 19, creationDate: new Date(2024, 2, 15).toISOString(), sensorID: 'sensor-2' },
  { id: 't9', type: 'temperature', value: 20, creationDate: new Date(2024, 2, 14).toISOString(), sensorID: 'sensor-3' },
  { id: 't10', type: 'temperature', value: 21, creationDate: new Date(2024, 2, 13).toISOString(), sensorID: 'sensor-1' },
  { id: 't11', type: 'temperature', value: 22, creationDate: new Date(2024, 1, 28).toISOString(), sensorID: 'sensor-2' },
  { id: 't12', type: 'temperature', value: 23, creationDate: new Date(2024, 1, 25).toISOString(), sensorID: 'sensor-3' },
  { id: 't13', type: 'temperature', value: 24, creationDate: new Date(2024, 1, 22).toISOString(), sensorID: 'sensor-1' },
  { id: 't14', type: 'temperature', value: 25, creationDate: new Date(2024, 1, 19).toISOString(), sensorID: 'sensor-2' },
  { id: 't15', type: 'temperature', value: 26, creationDate: new Date(2024, 1, 16).toISOString(), sensorID: 'sensor-3' },
  { id: 't16', type: 'temperature', value: 25, creationDate: new Date(2024, 1, 13).toISOString(), sensorID: 'sensor-1' },
  { id: 't17', type: 'temperature', value: 24, creationDate: new Date(2024, 1, 10).toISOString(), sensorID: 'sensor-2' },
  { id: 't18', type: 'temperature', value: 23, creationDate: new Date(2024, 1, 7).toISOString(), sensorID: 'sensor-3' },
  { id: 't19', type: 'temperature', value: 22, creationDate: new Date(2024, 1, 4).toISOString(), sensorID: 'sensor-1' },
  { id: 't20', type: 'temperature', value: 21, creationDate: new Date(2024, 1, 1).toISOString(), sensorID: 'sensor-2' },
  
  // Mesures d'humidité
  { id: 'h1', type: 'humidity', value: 65, creationDate: new Date(2024, 2, 22).toISOString(), sensorID: 'sensor-4' },
  { id: 'h2', type: 'humidity', value: 63, creationDate: new Date(2024, 2, 21).toISOString(), sensorID: 'sensor-5' },
  { id: 'h3', type: 'humidity', value: 60, creationDate: new Date(2024, 2, 20).toISOString(), sensorID: 'sensor-6' },
  { id: 'h4', type: 'humidity', value: 58, creationDate: new Date(2024, 2, 19).toISOString(), sensorID: 'sensor-4' },
  { id: 'h5', type: 'humidity', value: 55, creationDate: new Date(2024, 2, 18).toISOString(), sensorID: 'sensor-5' },
  { id: 'h6', type: 'humidity', value: 57, creationDate: new Date(2024, 2, 17).toISOString(), sensorID: 'sensor-6' },
  { id: 'h7', type: 'humidity', value: 60, creationDate: new Date(2024, 2, 16).toISOString(), sensorID: 'sensor-4' },
  { id: 'h8', type: 'humidity', value: 62, creationDate: new Date(2024, 2, 15).toISOString(), sensorID: 'sensor-5' },
  { id: 'h9', type: 'humidity', value: 65, creationDate: new Date(2024, 2, 14).toISOString(), sensorID: 'sensor-6' },
  { id: 'h10', type: 'humidity', value: 68, creationDate: new Date(2024, 2, 13).toISOString(), sensorID: 'sensor-4' },
  { id: 'h11', type: 'humidity', value: 70, creationDate: new Date(2024, 1, 28).toISOString(), sensorID: 'sensor-5' },
  { id: 'h12', type: 'humidity', value: 72, creationDate: new Date(2024, 1, 25).toISOString(), sensorID: 'sensor-6' },
  { id: 'h13', type: 'humidity', value: 69, creationDate: new Date(2024, 1, 22).toISOString(), sensorID: 'sensor-4' },
  { id: 'h14', type: 'humidity', value: 67, creationDate: new Date(2024, 1, 19).toISOString(), sensorID: 'sensor-5' },
  { id: 'h15', type: 'humidity', value: 65, creationDate: new Date(2024, 1, 16).toISOString(), sensorID: 'sensor-6' },
  { id: 'h16', type: 'humidity', value: 63, creationDate: new Date(2024, 1, 13).toISOString(), sensorID: 'sensor-4' },
  { id: 'h17', type: 'humidity', value: 61, creationDate: new Date(2024, 1, 10).toISOString(), sensorID: 'sensor-5' },
  { id: 'h18', type: 'humidity', value: 59, creationDate: new Date(2024, 1, 7).toISOString(), sensorID: 'sensor-6' },
  { id: 'h19', type: 'humidity', value: 57, creationDate: new Date(2024, 1, 4).toISOString(), sensorID: 'sensor-4' },
  { id: 'h20', type: 'humidity', value: 55, creationDate: new Date(2024, 1, 1).toISOString(), sensorID: 'sensor-5' },
  
  // Mesures de pollution de l'air
  { id: 'p1', type: 'airPollution', value: 45, creationDate: new Date(2024, 2, 22).toISOString(), sensorID: 'sensor-7' },
  { id: 'p2', type: 'airPollution', value: 47, creationDate: new Date(2024, 2, 21).toISOString(), sensorID: 'sensor-8' },
  { id: 'p3', type: 'airPollution', value: 50, creationDate: new Date(2024, 2, 20).toISOString(), sensorID: 'sensor-9' },
  { id: 'p4', type: 'airPollution', value: 52, creationDate: new Date(2024, 2, 19).toISOString(), sensorID: 'sensor-7' },
  { id: 'p5', type: 'airPollution', value: 55, creationDate: new Date(2024, 2, 18).toISOString(), sensorID: 'sensor-8' },
  { id: 'p6', type: 'airPollution', value: 53, creationDate: new Date(2024, 2, 17).toISOString(), sensorID: 'sensor-9' },
  { id: 'p7', type: 'airPollution', value: 51, creationDate: new Date(2024, 2, 16).toISOString(), sensorID: 'sensor-7' },
  { id: 'p8', type: 'airPollution', value: 48, creationDate: new Date(2024, 2, 15).toISOString(), sensorID: 'sensor-8' },
  { id: 'p9', type: 'airPollution', value: 46, creationDate: new Date(2024, 2, 14).toISOString(), sensorID: 'sensor-9' },
  { id: 'p10', type: 'airPollution', value: 43, creationDate: new Date(2024, 2, 13).toISOString(), sensorID: 'sensor-7' },
  { id: 'p11', type: 'airPollution', value: 40, creationDate: new Date(2024, 1, 28).toISOString(), sensorID: 'sensor-8' },
  { id: 'p12', type: 'airPollution', value: 38, creationDate: new Date(2024, 1, 25).toISOString(), sensorID: 'sensor-9' },
  { id: 'p13', type: 'airPollution', value: 42, creationDate: new Date(2024, 1, 22).toISOString(), sensorID: 'sensor-7' },
  { id: 'p14', type: 'airPollution', value: 45, creationDate: new Date(2024, 1, 19).toISOString(), sensorID: 'sensor-8' },
  { id: 'p15', type: 'airPollution', value: 48, creationDate: new Date(2024, 1, 16).toISOString(), sensorID: 'sensor-9' },
  { id: 'p16', type: 'airPollution', value: 51, creationDate: new Date(2024, 1, 13).toISOString(), sensorID: 'sensor-7' },
  { id: 'p17', type: 'airPollution', value: 54, creationDate: new Date(2024, 1, 10).toISOString(), sensorID: 'sensor-8' },
  { id: 'p18', type: 'airPollution', value: 52, creationDate: new Date(2024, 1, 7).toISOString(), sensorID: 'sensor-9' },
  { id: 'p19', type: 'airPollution', value: 49, creationDate: new Date(2024, 1, 4).toISOString(), sensorID: 'sensor-7' },
  { id: 'p20', type: 'airPollution', value: 46, creationDate: new Date(2024, 1, 1).toISOString(), sensorID: 'sensor-8' },
];

const MOCK_SENSORS = [
  { id: 'sensor-1', location: 'bedroom', userID: 'user-1', status: 'active' },
  { id: 'sensor-2', location: 'bedroom', userID: 'user-2', status: 'active' },
  { id: 'sensor-3', location: 'livingroom', userID: 'user-3', status: 'active' },
  { id: 'sensor-4', location: 'livingroom', userID: 'user-4', status: 'active' },
  { id: 'sensor-5', location: 'bathroom', userID: 'user-5', status: 'inactive' },
  { id: 'sensor-6', location: 'bathroom', userID: 'user-6', status: 'active' },
  { id: 'sensor-7', location: 'entrance', userID: 'user-7', status: 'active' },
  { id: 'sensor-8', location: 'entrance', userID: 'user-8', status: 'inactive' },
  { id: 'sensor-9', location: 'bedroom', userID: 'user-9', status: 'active' },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard by Habib & Baptiste</h1>
      
      <div className="widgets-grid">
        <div className="widget-container widget-small">
          <SensorCountWidget />
        </div>
        
        <div className="widget-container widget-small">
          <SensorChartWidget />
        </div>

        <div className="widget-container widget-small">
          <MeasurementTrendsWidget />
        </div>
        
        <div className="widget-container widget-large">
          <SensorGeoDistributionWidget />
        </div>

        <div className="widget-container widget-large">
          <WeatherWidget />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;