import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './SensorChartWidget.css';

const SensorChartWidget = ({ filters }) => {
  const [sensorTypeData, setSensorTypeData] = useState([
    { name: 'Température', count: 112, color: '#ff7300' },
    { name: 'Humidité', count: 98, color: '#0088fe' },
    { name: 'Pollution', count: 78, color: '#9467bd' }
  ]);
  
  const [sensorLocationData, setSensorLocationData] = useState([
    { name: 'Chambre', value: 35 },
    { name: 'Salon', value: 25 },
    { name: 'Salle de bain', value: 20 },
    { name: 'Entrée', value: 20 }
  ]);
  
  const [sensorActivityData, setSensorActivityData] = useState([
    { month: 'Jan', installed: 15, active: 15, inactive: 0 },
    { month: 'Fév', installed: 12, active: 11, inactive: 1 },
    { month: 'Mar', installed: 18, active: 16, inactive: 2 },
    { month: 'Avr', installed: 20, active: 18, inactive: 2 },
    { month: 'Mai', installed: 15, active: 13, inactive: 2 },
    { month: 'Juin', installed: 22, active: 19, inactive: 3 },
    { month: 'Juil', installed: 28, active: 24, inactive: 4 },
    { month: 'Août', installed: 30, active: 26, inactive: 4 },
    { month: 'Sep', installed: 18, active: 16, inactive: 2 },
    { month: 'Oct', installed: 25, active: 22, inactive: 3 },
    { month: 'Nov', installed: 22, active: 20, inactive: 2 },
    { month: 'Déc', installed: 14, active: 13, inactive: 1 }
  ]);
  
  const [activeTab, setActiveTab] = useState('types');

  // Couleurs pour les différents graphiques
  const LOCATION_COLORS = ['#4caf50', '#2196f3', '#f44336', '#ff9800'];

  // Composant pour la légende personnalisée du graphique en barres
  const CustomBarLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="custom-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <div className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: sensorTypeData.find(item => item.name === entry.value)?.color }}
              ></span>
              <span className="legend-text">{entry.value}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Rendu du contenu selon l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case 'types':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={sensorTypeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name, props) => [`${value} capteurs`, 'Nombre']}
                  labelFormatter={(value) => `Type: ${value}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <Legend content={<CustomBarLegend />} />
                <Bar dataKey="count" name="Nombre de capteurs">
                  {sensorTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="chart-note">
              <p>Répartition des capteurs par type de mesure</p>
            </div>
          </div>
        );
      
      case 'locations':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sensorLocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sensorLocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={LOCATION_COLORS[index % LOCATION_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} capteurs`, 'Nombre']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-note">
              <p>Répartition des capteurs par emplacement dans le domicile</p>
            </div>
          </div>
        );
      
      case 'activity':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={sensorActivityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => [`${value} capteurs`, name]}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="installed" 
                  name="Installés" 
                  stroke="#2196f3" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  name="Actifs" 
                  stroke="#4caf50" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inactive" 
                  name="Inactifs" 
                  stroke="#f44336" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-note">
              <p>Évolution des installations et de l'activité des capteurs sur 12 mois</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="enhanced-charts-widget">
      <div className="widget-header">
        <h3>Analyse des Capteurs</h3>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'types' ? 'active' : ''}`} 
            onClick={() => setActiveTab('types')}
          >
            Types
          </button>
          <button 
            className={`tab-button ${activeTab === 'locations' ? 'active' : ''}`} 
            onClick={() => setActiveTab('locations')}
          >
            Emplacements
          </button>
          <button 
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`} 
            onClick={() => setActiveTab('activity')}
          >
            Activité
          </button>
        </div>
      </div>
      <div className="widget-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SensorChartWidget;