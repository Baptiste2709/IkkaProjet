import React from 'react';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration</h1>
        <p className="admin-subtitle">
          Gérez vos capteurs et utilisateurs
        </p>
      </div>
      
      <div className="admin-content">
        <div className="admin-card">
          <div className="card-header">
            <h2>Page en construction</h2>
          </div>
          <div className="card-body">
            <div className="construction-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="64" 
                height="64" 
                fill="#f59e0b"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.19-3.87-1.23-7-5.52-7-10.19V6.3l7-3.12zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z" />
              </svg>
            </div>
            <p className="construction-message">
              Cette page est actuellement en cours de développement. Revenez bientôt pour accéder à l'administration de vos capteurs.
            </p>
            <div className="features-coming">
              <h3>Fonctionnalités à venir :</h3>
              <ul>
                <li>Gestion des capteurs (ajout, suppression, édition)</li>
                <li>Gestion des utilisateurs</li>
                <li>Gestion des données de mesures</li>
                <li>Paramètres système</li>
                <li>Export des données</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;