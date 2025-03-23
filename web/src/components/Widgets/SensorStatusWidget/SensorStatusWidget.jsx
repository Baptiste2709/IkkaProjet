import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './SensorStatusWidget.css';

// Composants d'icônes simples
const LoaderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
    <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="4" strokeDasharray="62.83" strokeDashoffset="15.71" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
    <path d="M15 9L9 15M9 9L15 15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SensorStatusWidget = () => {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState({});
  
  // Données factices pour le widget
  const MOCK_DATA = {
    totalSensors: 100,
    activeSensors: 75,
    inactiveSensors: 15,
    warningState: 10,
    averageAge: 128.5,
    statusDistribution: [
      { name: 'Actifs', value: 75 },
      { name: 'En alerte', value: 10 },
      { name: 'Inactifs', value: 15 }
    ],
    locationDistribution: [
      { name: 'Chambre', value: 35 },
      { name: 'Salon', value: 25 },
      { name: 'Salle de bain', value: 20 },
      { name: 'Entrée', value: 20 }
    ],
    problemSensors: [
      { id: '5ddba072', location: 'Entrée', daysSinceLastActivity: 45 },
      { id: '5ddba08b', location: 'Chambre', daysSinceLastActivity: 38 },
      { id: '5ddba096', location: 'Entrée', daysSinceLastActivity: 33 },
      { id: '5ddba0bd', location: 'Salle de bain', daysSinceLastActivity: 31 },
      { id: '5ddba06a', location: 'Entrée', daysSinceLastActivity: "Jamais actif" }
    ]
  };
  
  useEffect(() => {
    // Simuler un chargement de données avec un délai
    const timer = setTimeout(() => {
      setSensorData(MOCK_DATA);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Colors for the status pie chart
  const STATUS_COLORS = ['#4caf50', '#ff9800', '#f44336'];
  
  // Colors for the location pie chart
  const LOCATION_COLORS = ['#2196f3', '#9c27b0', '#3f51b5', '#009688', '#ff5722'];
  
  if (loading) {
    return (
      <div className="cardContainer">
        <div className="loadingContainer">
          <LoaderIcon />
          <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>Chargement des données...</p>
        </div>
      </div>
    );
  }
  
  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltipContainer">
          <p className="tooltipTitle">{`${payload[0].name} : ${payload[0].value}`}</p>
          <p>{`${Math.round(payload[0].percent * 100)}%`}</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="cardContainer">
      <div className="cardHeader">
        <h3 className="cardTitle">Statut des Capteurs</h3>
      </div>
      
      <div className="cardContent">
        {/* Première ligne: Trois statistiques côte à côte */}
        <div className="statGrid">
          <div className="statBox">
            <p className="statLabel">Total Capteurs</p>
            <p className="statValue">{sensorData.totalSensors}</p>
          </div>
          <div className="statBox">
            <p className="statLabel">Âge Moyen</p>
            <p className="statValue">{sensorData.averageAge} jours</p>
          </div>
          <div className="statBox">
            <p className="statLabel">Capteurs Actifs</p>
            <p className="statValue">{sensorData.activeSensors}</p>
          </div>
          <div className="statBox">
            <p className="statLabel">Capteurs Inactifs</p>
            <p className="statValue">{sensorData.inactiveSensors}</p>
          </div>
          <div className="statBox">
            <p className="statLabel">En Alerte</p>
            <p className="statValue">{sensorData.warningState}</p>
          </div>
          <div className="statBox">
            <p className="statLabel">Taux d'Activité</p>
            <p className="statValue">{Math.round(sensorData.activeSensors/sensorData.totalSensors*100)}%</p>
          </div>
        </div>
        
        {/* Deuxième ligne: Distribution des états et Distribution par emplacement, côte à côte */}
        <div className="chartGrid">
          <div className="chartItem">
            <p className="chartTitle">État des Capteurs</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={sensorData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {sensorData.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom"
                  align="center"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span style={{ fontSize: '0.7rem' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chartItem">
            <p className="chartTitle">Répartition par Emplacement</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={sensorData.locationDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  dataKey="value"
                >
                  {sensorData.locationDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={LOCATION_COLORS[index % LOCATION_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom"
                  align="center"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span style={{ fontSize: '0.7rem' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chartItem">
            <p className="sectionTitle">Capteurs Problématiques</p>
            <div className="problemList">
              {sensorData.problemSensors.length > 0 ? (
                <div>
                  {sensorData.problemSensors.slice(0, 4).map((sensor, index) => (
                    <div 
                      key={sensor.id} 
                      className={index === sensorData.problemSensors.slice(0, 4).length - 1 ? "problemItemLast" : "problemItem"}
                    >
                      <div className="flexRow">
                        <XCircleIcon className="problemIcon" />
                        <span className="problemText">
                          {sensor.location} - {sensor.id.slice(-5)}
                        </span>
                      </div>
                      <span className="problemStatus">
                        {sensor.daysSinceLastActivity === "Jamais actif" 
                          ? "Jamais actif" 
                          : `${sensor.daysSinceLastActivity} jours`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="emptyMessage">Aucun capteur problématique</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorStatusWidget;