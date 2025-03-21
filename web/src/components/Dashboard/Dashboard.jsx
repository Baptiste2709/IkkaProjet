import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';
import ChartWidget from '../Widgets/ChartWidget/ChartWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard</h1>
      <div className="widgets-container">
        <SensorCountWidget />
        <ChartWidget />
      </div>
    </div>
  );
};

export default Dashboard;