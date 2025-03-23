import React, { useState, useEffect } from 'react';
import './FilterWidget.css';

/**
 * Widget de filtrage pour le dashboard.
 * Permet de filtrer les données par utilisateur, type de capteur et emplacement.
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onFilterChange - Fonction appelée lorsque les filtres changent
 */
const FilterWidget = ({ onFilterChange }) => {
  // États pour stocker les filtres sélectionnés
  const [userFilter, setUserFilter] = useState('');
  const [sensorTypeFilter, setSensorTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  
  // États pour stocker les options disponibles pour chaque filtre
  const [userOptions, setUserOptions] = useState([]);
  const [sensorTypeOptions, setSensorTypeOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  
  // État pour indiquer le chargement des options
  const [loading, setLoading] = useState(true);

  // Effet pour charger les données initiales
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        
        // Dans une implémentation réelle, vous feriez appel à votre API
        // Ici, nous utilisons des données statiques pour la démonstration
        
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Options fictives pour les pays (basées sur les données User.json)
        setLocationOptions([
          { id: 'all', name: 'Tous les pays' },
          { id: 'china', name: 'Chine' },
          { id: 'greece', name: 'Grèce' },
          { id: 'japan', name: 'Japon' },
          { id: 'morocco', name: 'Maroc' },
          { id: 'italy', name: 'Italie' },
          { id: 'thailand', name: 'Thaïlande' },
          { id: 'mexico', name: 'Mexique' },
          { id: 'russia', name: 'Russie' },
          { id: 'peru', name: 'Pérou' },
          { id: 'ethiopia', name: 'Éthiopie' },
          { id: 'czech republic', name: 'République Tchèque' },
          { id: 'poland', name: 'Pologne' },
          { id: 'slovenia', name: 'Slovénie' },
          { id: 'malaysia', name: 'Malaisie' },
          { id: 'philippines', name: 'Philippines' },
          { id: 'ecuador', name: 'Équateur' },
          { id: 'albania', name: 'Albanie' }
        ]);
        
        // Options fictives pour les pièces (basées sur Sensor.json)
        setRoomOptions([
          { id: 'all', name: 'Toutes les pièces' },
          { id: 'bedroom', name: 'Chambre' },
          { id: 'livingroom', name: 'Salon' },
          { id: 'bathroom', name: 'Salle de bain' },
          { id: 'entrance', name: 'Entrée' }
        ]);
        
        // Options fictives pour les types de capteurs (basées sur Measure.json)
        setSensorTypeOptions([
          { id: 'all', name: 'Tous les types' },
          { id: 'temperature', name: 'Température' },
          { id: 'humidity', name: 'Humidité' },
          { id: 'airPollution', name: 'Pollution de l\'air' }
        ]);
        
        // Options fictives pour les utilisateurs
        setUserOptions([
          { id: 'all', name: 'Tous les utilisateurs' },
          { id: 'user1', name: 'Utilisateur #1' },
          { id: 'user2', name: 'Utilisateur #2' },
          { id: 'user3', name: 'Utilisateur #3' },
          { id: 'user4', name: 'Utilisateur #4' },
          { id: 'user5', name: 'Utilisateur #5' }
        ]);
        
        // Définir les valeurs par défaut
        setUserFilter('all');
        setSensorTypeFilter('all');
        setLocationFilter('all');
        setRoomFilter('all');
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des options de filtrage:', error);
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
  }, []);
  
  // Effet pour propager les changements de filtres
  useEffect(() => {
    if (!loading) {
      // Notifier le composant parent des changements de filtres
      onFilterChange && onFilterChange({
        user: userFilter,
        sensorType: sensorTypeFilter,
        location: locationFilter,
        room: roomFilter
      });
    }
  }, [userFilter, sensorTypeFilter, locationFilter, roomFilter, loading, onFilterChange]);
  
  // Réinitialiser tous les filtres
  const handleReset = () => {
    setUserFilter('all');
    setSensorTypeFilter('all');
    setLocationFilter('all');
    setRoomFilter('all');
  };
  
  // Appliquer les filtres (dans une implémentation réelle, cette fonction pourrait être utilisée pour confirmer les filtres)
  const handleApply = () => {
    // Cette fonction est utile si vous voulez que l'utilisateur confirme les filtres avant de les appliquer
    console.log('Filtres appliqués:', { userFilter, sensorTypeFilter, locationFilter, roomFilter });
  };
  
  return (
    <div className="filter-widget">
      <div className="filter-header">
        <h3>Filtrer les données</h3>
        <div className="filter-actions">
          <button 
            className="reset-button" 
            onClick={handleReset}
            disabled={loading}
          >
            Réinitialiser
          </button>
        </div>
      </div>
      
      <div className="filter-content">
        {loading ? (
          <div className="loading-indicator">
            Chargement des filtres...
          </div>
        ) : (
          <div className="filter-grid">
            {/* Filtre par pays */}
            <div className="filter-item">
              <label htmlFor="location-filter">Pays</label>
              <select 
                id="location-filter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locationOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtre par pièce */}
            <div className="filter-item">
              <label htmlFor="room-filter">Pièce</label>
              <select 
                id="room-filter"
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
              >
                {roomOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtre par type de capteur */}
            <div className="filter-item">
              <label htmlFor="sensor-type-filter">Type de capteur</label>
              <select 
                id="sensor-type-filter"
                value={sensorTypeFilter}
                onChange={(e) => setSensorTypeFilter(e.target.value)}
              >
                {sensorTypeOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtre par utilisateur */}
            <div className="filter-item">
              <label htmlFor="user-filter">Utilisateur</label>
              <select 
                id="user-filter"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                {userOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className="filter-info">
          {!loading && (
            <div className="active-filters">
              <span>Filtres actifs: </span>
              {locationFilter !== 'all' && (
                <span className="filter-tag">
                  {locationOptions.find(o => o.id === locationFilter)?.name}
                </span>
              )}
              {roomFilter !== 'all' && (
                <span className="filter-tag">
                  {roomOptions.find(o => o.id === roomFilter)?.name}
                </span>
              )}
              {sensorTypeFilter !== 'all' && (
                <span className="filter-tag">
                  {sensorTypeOptions.find(o => o.id === sensorTypeFilter)?.name}
                </span>
              )}
              {userFilter !== 'all' && (
                <span className="filter-tag">
                  {userOptions.find(o => o.id === userFilter)?.name}
                </span>
              )}
              {locationFilter === 'all' && roomFilter === 'all' && 
               sensorTypeFilter === 'all' && userFilter === 'all' && (
                <span className="filter-none">Aucun filtre actif</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterWidget;