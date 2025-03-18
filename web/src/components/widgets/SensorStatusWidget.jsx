// SensorStatusWidget.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorStatusWidget = () => {
  const [statusData, setStatusData] = useState({
    active: 0,
    maintenance: 0,
    inactive: 0,
    total: 0
  });
  const [typesData, setTypesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorStats = async () => {
      try {
        setLoading(true);
        const [statusRes, typesRes] = await Promise.all([
          axios.get('/api/sensors/stats/status'),
          axios.get('/api/sensors/stats/types')
        ]);
        setStatusData(statusRes.data);
        setTypesData(typesRes.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        setLoading(false);
        console.error('Error fetching sensor stats:', err);
      }
    };

    fetchSensorStats();
  }, []);

  // Données simulées pour la démo
  const mockStatusData = {
    active: 3312,
    maintenance: 828,
    inactive: 460,
    total: 4600
  };

  const mockTypesData = [
    { type: 'temperature', count: 1840, color: '#3b82f6' },
    { type: 'humidity', count: 1380, color: '#10b981' },
    { type: 'light', count: 690, color: '#f59e0b' },
    { type: 'door', count: 414, color: '#6366f1' },
    { type: 'motion', count: 276, color: '#ec4899' }
  ];

  // Utilisation des données mockées pour la démo
  const displayStatus = loading ? mockStatusData : statusData;
  const displayTypes = loading ? mockTypesData : typesData;

  // Calcul des pourcentages
  const getPercentage = (value) => {
    return ((value / displayStatus.total) * 100).toFixed(1);
  };

  if (loading && !mockStatusData) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Statut des capteurs</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && !mockStatusData) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Statut des capteurs</h2>
        <div className="flex justify-center items-center h-40 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Statut des capteurs</h2>
        <div className="text-sm text-gray-500">
          Total: <span className="font-medium">{displayStatus.total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex justify-between mb-1">
            <span className="font-medium">Actifs</span>
            <span className="font-medium text-green-700">{getPercentage(displayStatus.active)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${getPercentage(displayStatus.active)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {displayStatus.active.toLocaleString()} capteurs
          </div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex justify-between mb-1">
            <span className="font-medium">En maintenance</span>
            <span className="font-medium text-yellow-700">{getPercentage(displayStatus.maintenance)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-500 h-2.5 rounded-full" 
              style={{ width: `${getPercentage(displayStatus.maintenance)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {displayStatus.maintenance.toLocaleString()} capteurs
          </div>
        </div>
        
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex justify-between mb-1">
            <span className="font-medium">Inactifs</span>
            <span className="font-medium text-red-700">{getPercentage(displayStatus.inactive)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${getPercentage(displayStatus.inactive)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {displayStatus.inactive.toLocaleString()} capteurs
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Répartition par type</h3>
        <div className="space-y-2">
          {displayTypes.map(item => (
            <div key={item.type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex-1 text-sm capitalize">{item.type}</div>
              <div className="text-sm font-medium">{Math.round((item.count / displayStatus.total) * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Détails complets
        </button>
      </div>
    </div>
  );
};

export default SensorStatusWidget;