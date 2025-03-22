import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './SensorChartWidget.css';

const SensorChartWidget = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Définir les couleurs pour chaque type de capteur
  const COLORS = {
    'Température': '#ff7300',
    'Humidité': '#0088fe',
    'Pollution': '#9467bd'
  };
  
  useEffect(() => {
    // Simule un appel API - à remplacer par ton vrai appel API plus tard
    const fetchData = async () => {
      try {
        // À remplacer par fetch('/api/sensors/types') plus tard
        setTimeout(() => {
          const mockData = [
            { name: 'Température', Nombre: 112, color: COLORS['Température'] },
            { name: 'Humidité', Nombre: 98, color: COLORS['Humidité'] },
            { name: 'Pollution', Nombre: 78, color: COLORS['Pollution'] }
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

  // Créer un rendu personnalisé pour la légende avec les bonnes couleurs
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="custom-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <span 
              className="legend-color" 
              style={{ backgroundColor: data.find(item => item.name === entry.value)?.color }}
            ></span>
          </li>
        ))}
      </ul>
    );
  };

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
            <Tooltip 
              formatter={(value, name, props) => [value, 'Nombre de capteurs']}
              labelFormatter={(label) => `Type: ${label}`}
            />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="Nombre">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChartWidget;