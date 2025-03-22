// web/src/components/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';
import SensorGeoDistributionWidget from '../Widgets/SensorGeoDistributionWidget/SensorGeoDistributionWidget';
import MeasurementTrendsWidget from '../Widgets/MeasurementTrendsWidget/MeasurementTrendsWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard by Habib & Baptiste</h1>
      
      <div className="widgets-grid">
        <div className="widget-container widget-small">
          <SensorCountWidget />
        </div>
        
        <div className="widget-container widget-small">
          <SensorChartWidget />
        </div>

        <div className="widget-container widget-small">
          <MeasurementTrendsWidget />
        </div>
        
        <div className="widget-container widget-large">
          <SensorGeoDistributionWidget />
        </div>


      </div>
    </div>
  );
};

export default Dashboard;