// SensorsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorsPage = () => {
  const [sensors, setSensors] = useState([]);
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // État pour l'affichage détaillé
  const [selectedSensor, setSelectedSensor] = useState(null);
  
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/sensors');
        setSensors(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sensors:', err);
        setError('Erreur lors du chargement des capteurs');
        setLoading(false);
      }
    };
    
    fetchSensors();
  }, []);
  
  // Effet pour filtrer et trier les capteurs
  useEffect(() => {
    let result = [...sensors];
    
    // Filtrage
    if (searchTerm) {
      result = result.filter(sensor => 
        sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sensor.sensorId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType) {
      result = result.filter(sensor => sensor.type === filterType);
    }
    
    if (filterStatus) {
      result = result.filter(sensor => sensor.status === filterStatus);
    }
    
    // Tri
    result.sort((a, b) => {
      let compareResult = 0;
      
      if (sortBy === 'name') {
        compareResult = a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        compareResult = a.type.localeCompare(b.type);
      } else if (sortBy === 'status') {
        compareResult = a.status.localeCompare(b.status);
      } else if (sortBy === 'batteryLevel') {
        compareResult = a.batteryLevel - b.batteryLevel;
      }
      
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    
    setFilteredSensors(result);
  }, [sensors, searchTerm, filterType, filterStatus, sortBy, sortDirection]);
  
  // Calcul pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSensors.slice(indexOfFirstItem, indexOfLastItem);
  
  // Changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Gestion du tri
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Données de test pour la démonstration
  const mockSensors = [
    { _id: '1', sensorId: 'S001', name: 'Capteur Salon', type: 'temperature', status: 'active', batteryLevel: 87, lastMaintenance: '2023-03-15', location: {room: 'Salon', floor: 1}, userId: 'U001' },
    { _id: '2', sensorId: 'S002', name: 'Capteur Cuisine', type: 'humidity', status: 'active', batteryLevel: 92, lastMaintenance: '2023-02-20', location: {room: 'Cuisine', floor: 0}, userId: 'U001' },
    { _id: '3', sensorId: 'S003', name: 'Capteur Chambre', type: 'temperature', status: 'maintenance', batteryLevel: 45, lastMaintenance: '2023-04-05', location: {room: 'Chambre principale', floor: 1}, userId: 'U002' },
    { _id: '4', sensorId: 'S004', name: 'Capteur Entrée', type: 'motion', status: 'inactive', batteryLevel: 12, lastMaintenance: '2023-01-10', location: {room: 'Entrée', floor: 0}, userId: 'U003' },
    { _id: '5', sensorId: 'S005', name: 'Capteur Salle de bain', type: 'humidity', status: 'active', batteryLevel: 78, lastMaintenance: '2023-03-28', location: {room: 'Salle de bain', floor: 1}, userId: 'U002' },
    { _id: '6', sensorId: 'S006', name: 'Capteur Fenêtre', type: 'window', status: 'active', batteryLevel: 85, lastMaintenance: '2023-02-15', location: {room: 'Salon', floor: 0}, userId: 'U001' },
    { _id: '7', sensorId: 'S007', name: 'Capteur Porte', type: 'door', status: 'active', batteryLevel: 90, lastMaintenance: '2023-03-10', location: {room: 'Entrée', floor: 0}, userId: 'U003' },
    { _id: '8', sensorId: 'S008', name: 'Capteur Lumière', type: 'light', status: 'maintenance', batteryLevel: 60, lastMaintenance: '2023-02-28', location: {room: 'Bureau', floor: 1}, userId: 'U002' },
  ];
  
  // Utiliser les données mockées si aucune donnée réelle n'est disponible
  useEffect(() => {
    if (!loading && sensors.length === 0) {
      setSensors(mockSensors);
    }
  }, [loading, sensors]);
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleViewDetails = (sensor) => {
    setSelectedSensor(sensor);
  };
  
  const handleCloseDetails = () => {
    setSelectedSensor(null);
  };
  
  if (loading && sensors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error && sensors.length === 0) {
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
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des capteurs</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Ajouter un capteur
        </button>
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
                placeholder="Rechercher par nom ou ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Tous les types</option>
              <option value="temperature">Température</option>
              <option value="humidity">Humidité</option>
              <option value="motion">Mouvement</option>
              <option value="light">Lumière</option>
              <option value="door">Porte</option>
              <option value="window">Fenêtre</option>
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
              <option value="active">Actif</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactif</option>
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
      
      {/* Tableau des capteurs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('sensorId')}>
                  <div className="flex items-center">
                    ID
                    {sortBy === 'sensorId' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    Nom
                    {sortBy === 'name' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                  <div className="flex items-center">
                    Type
                    {sortBy === 'type' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center">
                    Statut
                    {sortBy === 'status' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('batteryLevel')}>
                  <div className="flex items-center">
                    Batterie
                    {sortBy === 'batteryLevel' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emplacement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((sensor) => (
                <tr key={sensor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sensor.sensorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sensor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {sensor.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(sensor.status)}`}>
                      {sensor.status === 'active' ? 'Actif' : sensor.status === 'maintenance' ? 'Maintenance' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            sensor.batteryLevel > 70 ? 'bg-green-500' : sensor.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${sensor.batteryLevel}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">{sensor.batteryLevel}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sensor.location ? `${sensor.location.room}, Étage ${sensor.location.floor}` : 'Non défini'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleViewDetails(sensor)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Détails
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-2">
                      Éditer
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredSensors.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
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
                disabled={currentPage === Math.ceil(filteredSensors.length / itemsPerPage)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === Math.ceil(filteredSensors.length / itemsPerPage) 
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
                    {Math.min(indexOfLastItem, filteredSensors.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredSensors.length}</span> capteurs
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
                  
                  {[...Array(Math.ceil(filteredSensors.length / itemsPerPage)).keys()].map((number) => (
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
                    disabled={currentPage === Math.ceil(filteredSensors.length / itemsPerPage)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                      currentPage === Math.ceil(filteredSensors.length / itemsPerPage) 
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
      </div>
      
      {/* Modal de détails du capteur */}
      {selectedSensor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseDetails}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Détails du capteur - {selectedSensor.name}
                    </h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Informations générales</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">ID:</span>
                            <p className="text-sm font-medium">{selectedSensor.sensorId}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Nom:</span>
                            <p className="text-sm font-medium">{selectedSensor.name}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Type:</span>
                            <p className="text-sm font-medium capitalize">{selectedSensor.type}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Statut:</span>
                            <p className="text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedSensor.status)}`}>
                                {selectedSensor.status === 'active' ? 'Actif' : selectedSensor.status === 'maintenance' ? 'Maintenance' : 'Inactif'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Emplacement</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">Pièce:</span>
                            <p className="text-sm font-medium">{selectedSensor.location?.room || 'Non défini'}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Étage:</span>
                            <p className="text-sm font-medium">{selectedSensor.location?.floor !== undefined ? selectedSensor.location.floor : 'Non défini'}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Foyer:</span>
                            <p className="text-sm font-medium">{selectedSensor.userId || 'Non défini'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">État technique</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">Niveau de batterie:</span>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    selectedSensor.batteryLevel > 70 ? 'bg-green-500' : selectedSensor.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${selectedSensor.batteryLevel}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{selectedSensor.batteryLevel}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Dernière maintenance:</span>
                            <p className="text-sm font-medium">{new Date(selectedSensor.lastMaintenance).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Dernières mesures</h4>
                        <div className="mt-2">
                          <div className="text-center py-4">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <p className="text-sm text-gray-500">Cliquez pour voir l'historique complet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <h4 className="text-sm font-medium text-blue-700">Configuration</h4>
                        </div>
                        <p className="text-xs text-blue-600">Paramètres de configuration du capteur</p>
                        <button className="mt-3 inline-flex items-center text-sm text-blue-700 hover:text-blue-900">
                          Modifier les paramètres
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                          </svg>
                          <h4 className="text-sm font-medium text-purple-700">Analyses</h4>
                        </div>
                        <p className="text-xs text-purple-600">Visualiser les tendances de mesures</p>
                        <button className="mt-3 inline-flex items-center text-sm text-purple-700 hover:text-purple-900">
                          Voir les analyses
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                          <h4 className="text-sm font-medium text-green-700">Maintenance</h4>
                        </div>
                        <p className="text-xs text-green-600">Planifier une maintenance</p>
                        <button className="mt-3 inline-flex items-center text-sm text-green-700 hover:text-green-900">
                          Programmer
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseDetails}
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

export default SensorsPage;