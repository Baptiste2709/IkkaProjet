import React, { useState, useEffect } from 'react';
import './SensorCountWidget.css';

const SensorCountWidget = () => {
  const [sensorCount, setSensorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dans un premier temps, nous utiliserons des données fictives
    // Plus tard, nous connecterons ce widget à l'API back-end
    const fetchSensorCount = async () => {
      try {
        // Simulation d'un appel API
        setTimeout(() => {
          // Données fictives pour le démarrage
          setSensorCount(1250);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchSensorCount();
  }, []);

  if (loading) return <div className="widget sensor-count-widget loading">Chargement...</div>;
  if (error) return <div className="widget sensor-count-widget error">{error}</div>;

  return (
    <div className="widget sensor-count-widget">
      <h3>Nombre total de capteurs</h3>
      <div className="count-value">{sensorCount}</div>
    </div>
  );
};

export default SensorCountWidget;