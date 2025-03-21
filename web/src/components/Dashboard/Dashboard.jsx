import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import SensorChartWidget from '../Widgets/SensorChartWidget/SensorChartWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard</h1>
      <div className="widgets-container">
        <SensorCountWidget />
        <SensorChartWidget />
      </div>
    </div>
  );
};

export default Dashboard;