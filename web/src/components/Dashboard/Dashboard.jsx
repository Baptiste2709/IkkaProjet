// web/src/components/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import SensorCountWidget from '../Widgets/SensorCountWidget/SensorCountWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>P.E.IoT Dashboard</h1>
      <div className="widgets-container">
        <SensorCountWidget />
      </div>
    </div>
  );
};

export default Dashboard;