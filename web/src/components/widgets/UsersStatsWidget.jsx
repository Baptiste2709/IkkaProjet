// UsersStatsWidget.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersStatsWidget = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSensors: 0,
    avgSensorsPerUser: 0,
    userSatisfaction: 0,
    newUsersThisMonth: 0,
    usersByRegion: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users/stats');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        setLoading(false);
        console.error('Error fetching user stats:', err);
      }
    };

    fetchUserStats();
  }, []);

  // Pour la démonstration, nous utilisons des données fictives
  const mockStats = {
    totalUsers: 1245,
    activeSensors: 4598,
    avgSensorsPerUser: 3.7,
    userSatisfaction: 92,
    newUsersThisMonth: 124,
    usersByRegion: [
      { region: 'Île-de-France', count: 327 },
      { region: 'Auvergne-Rhône-Alpes', count: 213 },
      { region: 'Nouvelle-Aquitaine', count: 197 },
      { region: 'Occitanie', count: 176 },
      { region: 'Provence-Alpes-Côte d\'Azur', count: 142 }
    ]
  };

  // Utilisation des données mockées pour la démo
  const displayStats = loading ? mockStats : stats;

  if (loading && !mockStats) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && !mockStats) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
        <div className="flex justify-center items-center h-40 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3 bg-blue-50">
          <div className="text-sm text-gray-600">Foyers équipés</div>
          <div className="text-2xl font-bold text-blue-700">{displayStats.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">
            +{displayStats.newUsersThisMonth} ce mois-ci
          </div>
        </div>
        
        <div className="border rounded-lg p-3 bg-green-50">
          <div className="text-sm text-gray-600">Capteurs actifs</div>
          <div className="text-2xl font-bold text-green-700">{displayStats.activeSensors.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">
            {displayStats.avgSensorsPerUser} par foyer
          </div>
        </div>
      </div>
      
      <div className="mt-4 border rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">Satisfaction utilisateurs</div>
          <div className="text-sm font-bold text-green-600">{displayStats.userSatisfaction}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${displayStats.userSatisfaction}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Top régions</h3>
        <div className="space-y-2">
          {displayStats.usersByRegion.slice(0, 5).map((region, index) => (
            <div key={region.region} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 flex items-center justify-center bg-gray-200 rounded-full mr-2 text-xs">
                  {index + 1}
                </div>
                <span className="text-sm">{region.region}</span>
              </div>
              <span className="text-sm font-medium">{region.count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir tous les utilisateurs
        </button>
      </div>
    </div>
  );
};

export default UsersStatsWidget;