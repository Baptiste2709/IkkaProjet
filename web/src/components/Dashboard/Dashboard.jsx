// web/src/components/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';
import SensorGeoDistributionWidget from '../Widgets/SensorGeoDistributionWidget/SensorGeoDistributionWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard</h1>
      
      <div className="widgets-grid">
        {/* Widget de comptage - occupe 1 colonne */}
        <div className="widget-container widget-small">
          <SensorCountWidget />
        </div>
        
        {/* Widget de graphique - occupe 1 colonne */}
        <div className="widget-container widget-small">
          <SensorChartWidget />
        </div>
        
        {/* Widget carte de distribution géographique - occupe 2 colonnes */}
        <div className="widget-container widget-large">
          <SensorGeoDistributionWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;