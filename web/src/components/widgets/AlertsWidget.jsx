// AlertsWidget.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertsWidget = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/alerts');
        setAlerts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les alertes');
        setLoading(false);
        console.error('Error fetching alerts:', err);
      }
    };

    fetchAlerts();
    
    // Rafraîchir les alertes toutes les minutes
    const interval = setInterval(fetchAlerts, 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fonction pour formater la date relative
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'à l\'instant';
    if (diffInMinutes === 1) return 'il y a 1 minute';
    if (diffInMinutes < 60) return `il y a ${diffInMinutes} minutes`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return 'il y a 1 heure';
    if (diffInHours < 24) return `il y a ${diffInHours} heures`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'hier';
    return `il y a ${diffInDays} jours`;
  };
  
  // Définir la couleur et l'icône en fonction du niveau d'alerte
  const getAlertStyle = (level) => {
    switch (level) {
      case 'critical':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          icon: (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
          icon: (
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-700',
          icon: (
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };
  
  // Simuler des alertes pour la démo
  const mockAlerts = [
    {
      id: 1,
      level: 'critical',
      message: 'Capteur #1042 hors-ligne',
      sensorId: '1042',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      location: 'Salon, Étage 1'
    },
    {
      id: 2,
      level: 'warning',
      message: 'Batterie faible #2305',
      sensorId: '2305',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: 'Cuisine, Rez-de-chaussée'
    },
    {
      id: 3,
      level: 'info',
      message: 'Maintenance requise #3017',
      sensorId: '3017',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      location: 'Chambre, Étage 1'
    },
    {
      id: 4,
      level: 'warning',
      message: 'Température anormale #1589',
      sensorId: '1589',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      location: 'Salle de bain, Étage 1'
    }
  ];

  // Pour la démo, on utilise les alertes simulées
  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Alertes récentes</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Alertes récentes</h2>
        <div className="flex justify-center items-center h-40 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Alertes récentes</h2>
        <span className="text-xs text-gray-500">
          {displayAlerts.length} {displayAlerts.length > 1 ? 'alertes' : 'alerte'}
        </span>
      </div>
      
      {displayAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Aucune alerte à afficher</span>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {displayAlerts.map((alert) => {
            const style = getAlertStyle(alert.level);
            
            return (
              <div
                key={alert.id}
                className={`p-3 ${style.bgColor} border-l-4 ${style.borderColor} rounded-md`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-2">
                    {style.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${style.textColor}`}>{alert.message}</div>
                    <div className="text-sm text-gray-600">{alert.location}</div>
                    <div className="text-xs text-gray-500 mt-1">{getRelativeTime(alert.timestamp)}</div>
                  </div>
                  <div className="ml-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir toutes les alertes
        </button>
      </div>
    </div>
  );
};

export default AlertsWidget;