// AlertsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // État pour l'affichage détaillé
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/alerts');
        setAlerts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Erreur lors du chargement des alertes');
        setLoading(false);
      }
    };
    
    fetchAlerts();
  }, []);
  
  // Effet pour filtrer et trier les alertes
  useEffect(() => {
    let result = [...alerts];
    
    // Filtrage
    if (searchTerm) {
      result = result.filter(alert => 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.sensorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterLevel) {
      result = result.filter(alert => alert.level === filterLevel);
    }
    
    if (filterStatus) {
      result = result.filter(alert => alert.status === filterStatus);
    }
    
    // Tri
    result.sort((a, b) => {
      let compareResult = 0;
      
      if (sortBy === 'timestamp') {
        compareResult = new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortBy === 'level') {
        const levelOrder = { critical: 0, warning: 1, info: 2 };
        compareResult = levelOrder[a.level] - levelOrder[b.level];
      } else if (sortBy === 'status') {
        const statusOrder = { new: 0, acknowledged: 1, resolved: 2 };
        compareResult = statusOrder[a.status] - statusOrder[b.status];
      }
      
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    
    setFilteredAlerts(result);
  }, [alerts, searchTerm, filterLevel, filterStatus, sortBy, sortDirection]);
  
  // Calcul pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Gestion du tri
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Données de test pour la démonstration
  const mockAlerts = [
    {
      id: 1,
      level: 'critical',
      status: 'new',
      message: 'Capteur #1042 hors-ligne',
      sensorId: '1042',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      location: 'Salon, Étage 1',
      details: 'Le capteur ne répond plus depuis 35 minutes. Dernière communication: 10:25'
    },
    {
      id: 2,
      level: 'warning',
      status: 'acknowledged',
      message: 'Batterie faible #2305',
      sensorId: '2305',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: 'Cuisine, Rez-de-chaussée',
      details: 'Niveau de batterie critique (10%). Remplacement nécessaire'
    },
    {
      id: 3,
      level: 'info',
      status: 'resolved',
      message: 'Maintenance requise #3017',
      sensorId: '3017',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      location: 'Chambre, Étage 1',
      details: 'Maintenance préventive programmée pour le 15/04/2023'
    },
    {
      id: 4,
      level: 'warning',
      status: 'new',
      message: 'Température anormale #1589',
      sensorId: '1589',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      location: 'Salle de bain, Étage 1',
      details: 'Température de 32°C détectée. Seuil d\'alerte: 30°C'
    },
    {
      id: 5,
      level: 'critical',
      status: 'new',
      message: 'Fuite d\'eau détectée #2751',
      sensorId: '2751',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      location: 'Buanderie, Sous-sol',
      details: 'Fuite d\'eau détectée près du lave-linge. Intervention urgente requise'
    },
    {
      id: 6,
      level: 'info',
      status: 'acknowledged',
      message: 'Mise à jour logicielle disponible',
      sensorId: 'Système',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Système central',
      details: 'Version 2.5.1 disponible. Améliorations de sécurité et corrections de bugs'
    },
    {
      id: 7,
      level: 'warning',
      status: 'acknowledged',
      message: 'Humidité élevée #3102',
      sensorId: '3102',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      location: 'Salle de bain, Étage 2',
      details: 'Humidité: 85%. Seuil d\'alerte: 80%. Vérifier la ventilation'
    },
  ];
  
  // Utiliser les données mockées si aucune donnée réelle n'est disponible
  useEffect(() => {
    if (!loading && alerts.length === 0) {
      setAlerts(mockAlerts);
    }
  }, [loading, alerts]);
  
  const getAlertLevelStyle = (level) => {
    switch (level) {
      case 'critical':
        return {
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          iconColor: 'text-red-500',
          borderColor: 'border-red-300'
        };
      case 'warning':
        return {
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-800',
          iconColor: 'text-yellow-500',
          borderColor: 'border-yellow-300'
        };
      case 'info':
      default:
        return {
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          iconColor: 'text-blue-500',
          borderColor: 'border-blue-300'
        };
    }
  };
  
  const getAlertStatusStyle = (status) => {
    switch (status) {
      case 'new':
        return {
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-800'
        };
      case 'acknowledged':
        return {
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800'
        };
      case 'resolved':
        return {
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-800'
        };
      default:
        return {
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-800'
        };
    }
  };
  
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'à l\'instant';
    if (diffInMinutes === 1) return 'il y a 1 minute';
    if (diffInMinutes < 60) return `il y a ${diffInMinutes} minutes`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return 'il y a 1 heure';
    if (diffInHours < 24) return `il y a ${diffInHours} heures`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'hier';
    return `il y a ${diffInDays} jours`;
  };
  
  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
  };
  
  const handleCloseDetails = () => {
    setSelectedAlert(null);
  };
  
  const handleAcknowledge = (id) => {
    // Mettre à jour le statut de l'alerte dans l'état
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'acknowledged' } : alert
    ));
  };
  
  const handleResolve = (id) => {
    // Mettre à jour le statut de l'alerte dans l'état
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ));
  };
  
  if (loading && alerts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error && alerts.length === 0) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des alertes</h1>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            Critiques: {alerts.filter(a => a.level === 'critical' && a.status !== 'resolved').length}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            Avertissements: {alerts.filter(a => a.level === 'warning' && a.status !== 'resolved').length}
          </span>
        </div>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                id="search"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Rechercher par message, ID ou emplacement"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select
              id="level"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="">Tous les niveaux</option>
              <option value="critical">Critique</option>
              <option value="warning">Avertissement</option>
              <option value="info">Information</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              id="status"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="new">Nouveau</option>
              <option value="acknowledged">Pris en compte</option>
              <option value="resolved">Résolu</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="itemsPerPage" className="block text-sm font-medium text-gray-700 mb-1">Afficher</label>
            <select
              id="itemsPerPage"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="5">5 par page</option>
              <option value="10">10 par page</option>
              <option value="25">25 par page</option>
              <option value="50">50 par page</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Liste des alertes */}
      <div className="space-y-4 mb-6">
        {currentItems.map((alert) => {
          const levelStyle = getAlertLevelStyle(alert.level);
          const statusStyle = getAlertStatusStyle(alert.status);
          
          return (
            <div key={alert.id} className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${levelStyle.borderColor}`}>
              <div className="flex flex-col md:flex-row md:items-start">
                {/* Icône et niveau */}
                <div className="mb-2 md:mb-0 md:mr-4 flex items-center">
                  <div className={`p-2 rounded-full ${levelStyle.badgeBg} ${levelStyle.iconColor}`}>
                    {alert.level === 'critical' ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : alert.level === 'warning' ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Contenu de l'alerte */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-base font-medium text-gray-900">{alert.message}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelStyle.badgeBg} ${levelStyle.badgeText}`}>
                        {alert.level === 'critical' ? 'Critique' : alert.level === 'warning' ? 'Avertissement' : 'Information'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyle.badgeBg} ${statusStyle.badgeText}`}>
                        {alert.status === 'new' ? 'Nouveau' : alert.status === 'acknowledged' ? 'Pris en compte' : 'Résolu'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <div className="flex flex-col md:flex-row md:space-x-6">
                      <span><strong>Capteur:</strong> {alert.sensorId}</span>
                      <span><strong>Emplacement:</strong> {alert.location}</span>
                      <span><strong>Date:</strong> {getRelativeTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                  <button
                    onClick={() => handleViewDetails(alert)}
                    className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                  >
                    Détails
                  </button>
                  
                  {alert.status === 'new' && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="inline-flex items-center justify-center px-3 py-1 border border-blue-300 text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                    >
                      Prendre en compte
                    </button>
                  )}
                  
                  {(alert.status === 'new' || alert.status === 'acknowledged') && (
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="inline-flex items-center justify-center px-3 py-1 border border-green-300 text-sm leading-5 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:border-green-300 focus:shadow-outline-green"
                    >
                      Résoudre
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {currentItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-2 text-base font-medium text-gray-900">Aucune alerte</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aucune alerte ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredAlerts.length > itemsPerPage && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 rounded-lg shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Précédent
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredAlerts.length / itemsPerPage)}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === Math.ceil(filteredAlerts.length / itemsPerPage) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredAlerts.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredAlerts.length}</span> alertes
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Précédent</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[...Array(Math.ceil(filteredAlerts.length / itemsPerPage)).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      currentPage === number + 1 
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredAlerts.length / itemsPerPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    currentPage === Math.ceil(filteredAlerts.length / itemsPerPage) 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Suivant</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de détails de l'alerte */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseDetails}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${getAlertLevelStyle(selectedAlert.level).badgeBg}`}>
                    <svg className={`h-6 w-6 ${getAlertLevelStyle(selectedAlert.level).iconColor}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      {selectedAlert.level === 'critical' ? (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      ) : selectedAlert.level === 'warning' ? (
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      )}
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedAlert.message}
                    </h3>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertLevelStyle(selectedAlert.level).badgeBg} ${getAlertLevelStyle(selectedAlert.level).badgeText}`}>
                          {selectedAlert.level === 'critical' ? 'Critique' : selectedAlert.level === 'warning' ? 'Avertissement' : 'Information'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertStatusStyle(selectedAlert.status).badgeBg} ${getAlertStatusStyle(selectedAlert.status).badgeText}`}>
                          {selectedAlert.status === 'new' ? 'Nouveau' : selectedAlert.status === 'acknowledged' ? 'Pris en compte' : 'Résolu'}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Détails de l'alerte</h4>
                        <p className="text-sm text-gray-700">{selectedAlert.details}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500">Capteur</h4>
                          <p className="text-sm font-medium">{selectedAlert.sensorId}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500">Emplacement</h4>
                          <p className="text-sm font-medium">{selectedAlert.location}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500">Date</h4>
                          <p className="text-sm font-medium">{new Date(selectedAlert.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500">Statut</h4>
                          <p className="text-sm font-medium capitalize">{selectedAlert.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedAlert.status === 'new' && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAcknowledge(selectedAlert.id);
                      handleCloseDetails();
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Prendre en compte
                  </button>
                )}
                
                {(selectedAlert.status === 'new' || selectedAlert.status === 'acknowledged') && (
                  <button
                    type="button"
                    onClick={() => {
                      handleResolve(selectedAlert.id);
                      handleCloseDetails();
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Résoudre
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;