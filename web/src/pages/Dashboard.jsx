// Dashboard.jsx
import React, { useState } from 'react';

// Import des widgets
import SensorMap from '../components/widgets/SensorMap/SensorMap';
import MeasuresChart from '../components/widgets/MeasuresChart/MeasuresChart';
import WeatherWidget from '../components/widgets/WeatherWidget/WeatherWidget';
import UsersStatsWidget from '../components/widgets/UsersStatsWidget/UsersStatsWidget';
import SensorStatusWidget from '../components/widgets/SensorStatusWidget/SensorStatusWidget';
import AlertsWidget from '../components/widgets/AlertsWidget/AlertsWidget';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('day');
  
  // Gestion du changement de période pour les widgets
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };
  
  return (
    <div>
      {/* En-tête du dashboard */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="text-sm text-gray-600">Période :</span>
          <div className="flex space-x-1">
            <button 
              onClick={() => handleTimeframeChange('day')}
              className={`px-3 py-1 text-sm rounded ${timeframe === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Jour
            </button>
            <button 
              onClick={() => handleTimeframeChange('week')}
              className={`px-3 py-1 text-sm rounded ${timeframe === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Semaine
            </button>
            <button 
              onClick={() => handleTimeframeChange('month')}
              className={`px-3 py-1 text-sm rounded ${timeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Mois
            </button>
          </div>
          
          <div className="ml-4">
            <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Exporter
            </button>
          </div>
        </div>
      </div>
      
      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Capteurs actifs</p>
              <p className="text-lg font-semibold">3,312</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Foyers équipés</p>
              <p className="text-lg font-semibold">1,245</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Relevés aujourd'hui</p>
              <p className="text-lg font-semibold">24,521</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alertes actives</p>
              <p className="text-lg font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Première rangée de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Carte des capteurs - occupe 2 colonnes sur grand écran */}
        <div className="lg:col-span-2">
          <SensorMap />
        </div>
        
        {/* Widget météo */}
        <div>
          <WeatherWidget city="Paris" country="FR" />
        </div>
      </div>
      
      {/* Deuxième rangée de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Graphique des mesures - occupe 2 colonnes sur grand écran */}
        <div className="lg:col-span-2">
          <MeasuresChart sensorType="temperature" period={timeframe} />
        </div>
        
        {/* Widget statut des capteurs */}
        <div>
          <SensorStatusWidget />
        </div>
      </div>
      
      {/* Troisième rangée de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget statistiques utilisateurs */}
        <div>
          <UsersStatsWidget />
        </div>
        
        {/* Widget alertes */}
        <div>
          <AlertsWidget />
        </div>
        
        {/* Espace pour un futur widget ou une information complémentaire */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Aide & Ressources</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Guide d'utilisation</h3>
                <p className="text-xs text-gray-500">Consultez notre documentation complète sur l'utilisation du dashboard.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">FAQ</h3>
                <p className="text-xs text-gray-500">Trouvez des réponses aux questions fréquemment posées.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Support technique</h3>
                <p className="text-xs text-gray-500">Contactez notre équipe pour toute assistance technique.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
              Contacter le support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;