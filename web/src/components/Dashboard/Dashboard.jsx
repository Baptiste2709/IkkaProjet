import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import FilterWidget from '../Widgets/FilterWidget/FilterWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';
import SensorGeoDistributionWidget from '../Widgets/SensorGeoDistributionWidget/SensorGeoDistributionWidget';
import MeasurementTrendsWidget from '../Widgets/MeasurementTrendsWidget/MeasurementTrendsWidget';
import SensorStatusWidget from '../Widgets/SensorStatusWidget/SensorStatusWidget';
import CombinedCountWidget from '../Widgets/CombinedCountWidget/CombinedCountWidget';

const Dashboard = () => {
  // État pour stocker les filtres actifs
  const [activeFilters, setActiveFilters] = useState({
    user: 'all',
    sensorType: 'all',
    location: 'all',
    room: 'all'
  });
 
  // Fonction pour gérer les changements de filtres
  const handleFilterChange = (filters) => {
    console.log('Filtres mis à jour:', filters);
    setActiveFilters(filters);
   
    // Ici, vous pourriez appeler votre API pour récupérer des données filtrées
    // ou appliquer les filtres aux données locales
  };
 
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard by Habib & Baptiste</h1>
     
      {/* Widget de filtrage */}
      <FilterWidget onFilterChange={handleFilterChange} />
     
      <div className="dashboard-main-content">
        {/* Première rangée: Map à gauche (2/3) et compteur combiné à droite (1/3) */}
        <div className="map-counter-container">
          <div className="map-container">
            <SensorGeoDistributionWidget filters={activeFilters} />
          </div>
          <div className="counter-container">
            <CombinedCountWidget filters={activeFilters} />
          </div>
        </div>
       
        {/* Deuxième rangée: Widgets de données */}
        <div className="widgets-grid">
          <div className="widget-container widget-large">
            <SensorChartWidget filters={activeFilters} />
          </div>
         
          <div className="widget-container widget-small">
            <MeasurementTrendsWidget filters={activeFilters} />
          </div>
         
          <div className="widget-container widget-small">
            <SensorStatusWidget filters={activeFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;