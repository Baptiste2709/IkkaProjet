import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const MeasuresChart = ({ sensorType, period = 'week' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/measures/${sensorType}?period=${period}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [sensorType, period]);

  const handlePeriodChange = (newPeriod) => {
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Évolution des mesures: {sensorType}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handlePeriodChange('day')}
            className={`px-2 py-1 text-xs rounded ${period === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Jour
          </button>
          <button 
            onClick={() => handlePeriodChange('week')}
            className={`px-2 py-1 text-xs rounded ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Semaine
          </button>
          <button 
            onClick={() => handlePeriodChange('month')}
            className={`px-2 py-1 text-xs rounded ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Mois
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            activeDot={{ r: 8 }} 
            name="Valeur"
          />
          {sensorType === 'temperature' && (
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#10b981" 
              name="Humidité"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MeasuresChart;