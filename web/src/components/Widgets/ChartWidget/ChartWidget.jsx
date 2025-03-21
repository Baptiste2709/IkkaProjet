import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartWidget.css';

const ChartWidget = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL relative à ton serveur Express
    const apiUrl = 'http://localhost:5173/api/measures';
    
    // Utilisation de console.log pour déboguer
    console.log('Début de la requête API vers:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Statut de la réponse:', response.status);
        
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Erreur HTTP ${response.status}: ${JSON.stringify(errorData)}`);
          });
        }
        
        return response.json();
      })
      .then(measureData => {
        console.log('Données reçues:', measureData.length, 'entrées');
        
        // Agrégation des données
        const typeStats = measureData.reduce((acc, item) => {
          if (!acc[item.type]) {
            acc[item.type] = { count: 0, total: 0 };
          }
          acc[item.type].count++;
          acc[item.type].total += item.value;
          return acc;
        }, {});
        
        // Formatage pour le graphique
        const chartData = Object.keys(typeStats).map(type => ({
          type: type === 'temperature' ? 'Température' : 
                type === 'humidity' ? 'Humidité' : 'Pollution',
          count: typeStats[type].count,
          average: Math.round((typeStats[type].total / typeStats[type].count) * 100) / 100
        }));
        
        console.log('Données traitées pour le graphique:', chartData);
        setData(chartData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur complète:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="chart-widget loading">Chargement des données...</div>;
  if (error) return <div className="chart-widget error">Erreur: {error}</div>;
  if (data.length === 0) return <div className="chart-widget empty">Aucune donnée disponible</div>;

  return (
    <div className="chart-widget">
      <h3>Analyse des capteurs par type de mesure</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="count" name="Nombre de mesures" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="average" name="Valeur moyenne" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWidget;