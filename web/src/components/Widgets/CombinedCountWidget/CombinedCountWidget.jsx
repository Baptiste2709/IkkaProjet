import React, { useState, useEffect } from 'react';
import './CombinedCountWidget.css';

const CombinedCountWidget = () => {
  const [sensorCount, setSensorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler un appel API avec des données fictives
    const fetchData = async () => {
      try {
        // Simulation d'un délai de chargement
        setTimeout(() => {
          // Données fictives basées sur les JSON fournis
          setSensorCount(100); // Nombre approximatif des capteurs dans Sensor.json
          setUserCount(20);    // Nombre basé sur User.json (20 entrées)
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="combined-count-widget loading">Chargement...</div>;
  if (error) return <div className="combined-count-widget error">{error}</div>;

  return (
    <div className="combined-count-widget">
      <h3>Tableau de bord global</h3>
      
      <div className="counts-container">
        <div className="count-item">
          <div className="count-icon sensor-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
          </div>
          <div className="count-details">
            <div className="count-value">{sensorCount}</div>
            <div className="count-label">Capteurs</div>
          </div>
        </div>
        
        <div className="count-divider"></div>
        
        <div className="count-item">
          <div className="count-icon user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="count-details">
            <div className="count-value">{userCount}</div>
            <div className="count-label">Utilisateurs</div>
          </div>
        </div>
      </div>
      
      <div className="additional-stats">
        <div className="stat-item">
          <span className="stat-label">Ratio Capteurs/Utilisateur:</span>
          <span className="stat-value">{(sensorCount / userCount).toFixed(1)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Dernière mise à jour:</span>
          <span className="stat-value">{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CombinedCountWidget;