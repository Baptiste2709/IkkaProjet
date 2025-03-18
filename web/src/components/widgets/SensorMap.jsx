// SensorMap.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Carte de France simplifiée avec les coordonnées des principales régions
const regions = [
  { id: 1, name: 'Île-de-France', x: 300, y: 200, sensorCount: 0 },
  { id: 2, name: 'Grand Est', x: 400, y: 180, sensorCount: 0 },
  { id: 3, name: 'Hauts-de-France', x: 320, y: 120, sensorCount: 0 },
  { id: 4, name: 'Normandie', x: 240, y: 150, sensorCount: 0 },
  { id: 5, name: 'Bretagne', x: 150, y: 180, sensorCount: 0 },
  { id: 6, name: 'Pays de la Loire', x: 200, y: 220, sensorCount: 0 },
  { id: 7, name: 'Centre-Val de Loire', x: 280, y: 240, sensorCount: 0 },
  { id: 8, name: 'Bourgogne-Franche-Comté', x: 360, y: 250, sensorCount: 0 },
  { id: 9, name: 'Nouvelle-Aquitaine', x: 200, y: 320, sensorCount: 0 },
  { id: 10, name: 'Occitanie', x: 260, y: 380, sensorCount: 0 },
  { id: 11, name: 'Auvergne-Rhône-Alpes', x: 340, y: 320, sensorCount: 0 },
  { id: 12, name: 'Provence-Alpes-Côte d\'Azur', x: 380, y: 370, sensorCount: 0 },
  { id: 13, name: 'Corse', x: 420, y: 420, sensorCount: 0 },
];

const SensorMap = () => {
  const [sensorData, setSensorData] = useState([]);
  const [regionData, setRegionData] = useState(regions);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/sensors/stats/regions');
        
        // Mise à jour des données de régions avec les compteurs de capteurs
        const updatedRegions = regions.map(region => {
          const regionStats = response.data.find(stat => stat.region === region.name);
          return {
            ...region,
            sensorCount: regionStats ? regionStats.count : 0
          };
        });
        
        setSensorData(response.data);
        setRegionData(updatedRegions);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les données des capteurs');
        setLoading(false);
        console.error('Error fetching sensor data:', err);
      }
    };

    fetchSensorData();
  }, []);

  // Calcul de la taille des cercles en fonction du nombre de capteurs
  const getCircleSize = (count) => {
    const baseSize = 10;
    const maxSize = 30;
    if (count === 0) return baseSize;
    return Math.min(baseSize + Math.log(count) * 5, maxSize);
  };

  // Calcul de la couleur en fonction du nombre de capteurs
  const getCircleColor = (count) => {
    if (count === 0) return '#c0c0c0';
    if (count < 10) return '#90cdf4';
    if (count < 50) return '#63b3ed';
    if (count < 100) return '#4299e1';
    if (count < 200) return '#3182ce';
    return '#2b6cb0';
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Répartition des capteurs</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Répartition des capteurs</h2>
        <div className="flex justify-center items-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Répartition des capteurs</h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full h-[400px] border rounded bg-gray-50">
          <svg
            viewBox="0 0 600 500"
            className="w-full h-full"
          >
            {/* Contour de la carte de France (simplifié) */}
            <path
              d="M150,100 C100,150 100,200 120,250 C80,300 120,350 150,380 C200,400 250,420 300,420 C350,420 400,400 450,350 C480,300 450,250 440,220 C460,180 440,120 400,100 C350,80 300,80 250,90 C200,100 180,80 150,100 Z"
              fill="#f0f0f0"
              stroke="#d0d0d0"
              strokeWidth="2"
            />
            
            {/* Points représentant les régions */}
            {regionData.map((region) => (
              <g key={region.id} onClick={() => handleRegionClick(region)}>
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={getCircleSize(region.sensorCount)}
                  fill={getCircleColor(region.sensorCount)}
                  stroke="#fff"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                />
                <text
                  x={region.x}
                  y={region.y + getCircleSize(region.sensorCount) + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#666"
                  className="pointer-events-none"
                >
                  {region.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {selectedRegion && (
          <div className="w-full md:w-64 mt-4 md:mt-0 md:ml-4 p-4 border rounded">
            <h3 className="font-semibold">{selectedRegion.name}</h3>
            <div className="mt-2">
              <div className="flex justify-between">
                <span>Capteurs actifs</span>
                <span className="font-medium">{selectedRegion.sensorCount}</span>
              </div>
              
              {/* Ici vous pourriez ajouter plus de détails sur la région sélectionnée */}
              <div className="mt-4">
                <h4 className="text-sm font-medium">Types de capteurs</h4>
                <ul className="mt-1 text-sm">
                  <li className="flex justify-between">
                    <span>Température</span>
                    <span>{Math.round(selectedRegion.sensorCount * 0.4)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Humidité</span>
                    <span>{Math.round(selectedRegion.sensorCount * 0.3)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Autres</span>
                    <span>{Math.round(selectedRegion.sensorCount * 0.3)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="mr-2">Nombre de capteurs :</span>
          <div className="flex items-center">
            <div style={{ backgroundColor: '#90cdf4', width: '10px', height: '10px', borderRadius: '50%', marginRight: '4px' }}></div>
            <span className="mr-2">1-10</span>
          </div>
          <div className="flex items-center">
            <div style={{ backgroundColor: '#4299e1', width: '10px', height: '10px', borderRadius: '50%', marginRight: '4px' }}></div>
            <span className="mr-2">10-100</span>
          </div>
          <div className="flex items-center">
            <div style={{ backgroundColor: '#2b6cb0', width: '10px', height: '10px', borderRadius: '50%', marginRight: '4px' }}></div>
            <span>100+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorMap;