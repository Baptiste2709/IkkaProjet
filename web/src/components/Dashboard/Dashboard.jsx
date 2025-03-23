import React, { useState } from 'react';
import './Dashboard.css';
import FilterWidget from '../Widgets/FilterWidget/FilterWidget';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';
import SensorGeoDistributionWidget from '../Widgets/SensorGeoDistributionWidget/SensorGeoDistributionWidget';
import MeasurementTrendsWidget from '../Widgets/MeasurementTrendsWidget/MeasurementTrendsWidget';
import WeatherWidget from '../Widgets/WeatherWidget/WeatherWidget';
import SensorStatusWidget from '../Widgets/SensorStatusWidget/SensorStatusWidget';

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
      
      {/* Nouveau widget de filtrage */}
      <FilterWidget onFilterChange={handleFilterChange} />
      
      <div className="widgets-grid">
        <div className="widget-container widget-small">
          <SensorCountWidget filters={activeFilters} />
        </div>
        
        <div className="widget-container widget-small">
          <SensorChartWidget filters={activeFilters} />
        </div>

        <div className="widget-container widget-small">
          <MeasurementTrendsWidget filters={activeFilters} />
        </div>

        <div className="widget-container widget-large">
          <WeatherWidget filters={activeFilters} />
        </div>
        
        <div className="widget-container widget-small widget-tall">
          <SensorStatusWidget filters={activeFilters} />
        </div>

        <div className="widget-container widget-full">
          <SensorGeoDistributionWidget filters={activeFilters} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;