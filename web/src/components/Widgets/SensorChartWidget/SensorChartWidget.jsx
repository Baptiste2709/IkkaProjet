// SensorChartWidget.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SensorChartWidget.css';

const SensorChartWidget = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un appel API - à remplacer par ton vrai appel API plus tard
    const fetchData = async () => {
      try {
        // À remplacer par fetch('/api/sensors/types') plus tard
        setTimeout(() => {
          const mockData = [
            { name: 'Temperature', count: 112 },
            { name: 'Humidity', count: 98 },
            { name: 'AirPollution', count: 78 }
          ];
          setData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="sensor-chart-widget">
        <div className="widget-header">
          <h3>Répartition des capteurs</h3>
        </div>
        <div className="widget-content loading">
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sensor-chart-widget">
      <div className="widget-header">
        <h3>Répartition des capteurs</h3>
      </div>
      <div className="widget-content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChartWidget;