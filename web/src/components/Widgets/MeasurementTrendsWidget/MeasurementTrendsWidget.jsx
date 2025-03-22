import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './MeasurementTrendsWidget.css';

// Simuler l'appel API (à remplacer par un vrai appel API plus tard)
const fetchMeasurementData = async (period) => {
  // Données mensuelles précalculées à partir du fichier Measure.json
  const monthlyData = [
    { month: "2023-11", temperature: 20.3, humidity: 36.3, airPollution: 45.2 },
    { month: "2023-12", temperature: 24.5, humidity: 51.4, airPollution: 49.8 },
    { month: "2024-01", temperature: 16.6, humidity: 52.2, airPollution: 47.2 },
    { month: "2024-02", temperature: 17.4, humidity: 57.2, airPollution: 43.5 },
    { month: "2024-03", temperature: 23.5, humidity: 54.6, airPollution: 59.7 },
    { month: "2024-04", temperature: 20.1, humidity: 50.0, airPollution: 55.8 },
    { month: "2024-05", temperature: 22.8, humidity: 49.1, airPollution: 51.7 },
    { month: "2024-06", temperature: 17.9, humidity: 50.7, airPollution: 60.3 },
    { month: "2024-07", temperature: 19.9, humidity: 53.3, airPollution: 53.5 },
    { month: "2024-08", temperature: 19.5, humidity: 49.9, airPollution: 47.9 },
    { month: "2024-09", temperature: 20.4, humidity: 53.5, airPollution: 45.6 },
    { month: "2024-10", temperature: 19.6, humidity: 54.0, airPollution: 37.3 },
    { month: "2024-11", temperature: 26.4, humidity: 37.4, airPollution: 44.8 }
  ];

  const formatDate = (monthStr) => {
    const [year, month] = monthStr.split('-');
    return `${month}/${year.slice(2)}`;
  };

  // Formater les données pour l'affichage
  const formattedData = monthlyData.map(item => ({
    ...item,
    date: formatDate(item.month)
  }));

  // Filtrer selon la période demandée
  let filteredData = formattedData;
  if (period === '3months') {
    filteredData = formattedData.slice(-3);
  } else if (period === '6months') {
    filteredData = formattedData.slice(-6);
  } else if (period === '12months') {
    filteredData = formattedData.slice(-12);
  }

  return filteredData;
};

const MeasurementTrendsWidget = () => {
  const [data, setData] = useState([]);
  const [measureType, setMeasureType] = useState('temperature');
  const [period, setPeriod] = useState('6months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const measureData = await fetchMeasurementData(period);
        setData(measureData);
      } catch (error) {
        console.error("Error fetching measurement data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [period]);

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  // Configurations selon le type de mesure
  const measureConfigs = {
    temperature: {
      color: "#ff7300",
      unit: "°C",
      domain: [0, 40],
      label: "Température"
    },
    humidity: {
      color: "#0088fe",
      unit: "%",
      domain: [0, 100],
      label: "Humidité"
    },
    airPollution: {
      color: "#9467bd",
      unit: "AQI",
      domain: [0, 100],
      label: "Pollution de l'air"
    }
  };

  const currentConfig = measureConfigs[measureType];

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Évolution des mesures</h3>
        <div className="period-toggle">
          <button 
            className={`toggle-btn ${period === '3months' ? 'active' : ''}`} 
            onClick={() => handlePeriodChange('3months')}
          >
            3M
          </button>
          <button 
            className={`toggle-btn ${period === '6months' ? 'active' : ''}`} 
            onClick={() => handlePeriodChange('6months')}
          >
            6M
          </button>
          <button 
            className={`toggle-btn ${period === '12months' ? 'active' : ''}`} 
            onClick={() => handlePeriodChange('12months')}
          >
            12M
          </button>
        </div>
      </div>
      
      <div className="widget-content">
        <div className="measure-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${measureType === 'temperature' ? 'active' : ''}`}
              onClick={() => setMeasureType('temperature')}
            >
              Température
            </button>
            <button 
              className={`tab-btn ${measureType === 'humidity' ? 'active' : ''}`}
              onClick={() => setMeasureType('humidity')}
            >
              Humidité
            </button>
            <button 
              className={`tab-btn ${measureType === 'airPollution' ? 'active' : ''}`}
              onClick={() => setMeasureType('airPollution')}
            >
              Pollution
            </button>
          </div>

          <div className="tab-content">
            {loading ? (
              <div className="loading-indicator">
                <p>Chargement des données...</p>
              </div>
            ) : (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={currentConfig.domain}
                      tick={{ fontSize: 12 }}
                      label={{ 
                        value: `${currentConfig.label} (${currentConfig.unit})`, 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fontSize: '0.8rem', textAnchor: 'middle' }
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} ${currentConfig.unit}`, currentConfig.label]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={measureType}
                      stroke={currentConfig.color}
                      activeDot={{ r: 8 }}
                      dot={{ r: 3 }}
                      name={currentConfig.label}
                      isAnimationActive={true}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementTrendsWidget;