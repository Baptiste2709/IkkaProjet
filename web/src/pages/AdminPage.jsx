// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  // État pour les onglets
  const [activeTab, setActiveTab] = useState('sensors');

  // État pour les données des capteurs
  const [sensors, setSensors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // État pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // État pour l'édition
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // État pour les suppressions
  const [deletingItem, setDeletingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let sensorsRes, usersRes;

        if (activeTab === 'sensors') {
          sensorsRes = await axios.get('/api/sensors');
          setSensors(sensorsRes.data);
        } else if (activeTab === 'users') {
          usersRes = await axios.get('/api/users');
          setUsers(usersRes.data);
        }

        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [activeTab]);

  // Fonction pour filtrer les capteurs
  const filteredSensors = sensors.filter(sensor => {
    // Filtre par terme de recherche
    const searchMatch = searchTerm === '' || 
      sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.sensorId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par type
    const typeMatch = filterType === '' || sensor.type === filterType;
    
    // Filtre par statut
    const statusMatch = filterStatus === '' || sensor.status === filterStatus;
    
    return searchMatch && typeMatch && statusMatch;
  });

  // Fonction pour filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    return searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calcul pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSensors = filteredSensors.slice(indexOfFirstItem, indexOfLastItem);
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour éditer un capteur ou un utilisateur
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  // Fonction pour mettre à jour le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour sauvegarder les modifications
  const handleSave = async () => {
    try {
      let response;
      
      if (activeTab === 'sensors') {
        response = await axios.put(`/api/sensors/${formData._id}`, formData);
        setSensors(sensors.map(sensor => 
          sensor._id === formData._id ? response.data : sensor
        ));
      } else if (activeTab === 'users') {
        response = await axios.put(`/api/users/${formData._id}`, formData);
        setUsers(users.map(user => 
          user._id === formData._id ? response.data : user
        ));
      }
      
      setEditingItem(null);
      setFormData({});
    } catch (err) {
      console.error('Error updating item:', err);
      // Gérer l'erreur (afficher un message, etc.)
    }
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({});
  };

  // Fonction pour confirmer la suppression
  const handleDeleteConfirm = async () => {
    try {
      if (activeTab === 'sensors') {
        await axios.delete(`/api/sensors/${deletingItem._id}`);
        setSensors(sensors.filter(sensor => sensor._id !== deletingItem._id));
      } else if (activeTab === 'users') {
        await axios.delete(`/api/users/${deletingItem._id}`);
        setUsers(users.filter(user => user._id !== deletingItem._id));
      }
      
      setDeletingItem(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      // Gérer l'erreur (afficher un message, etc.)
    }
  };

  // Fonction pour annuler la suppression
  const handleCancelDelete = () => {
    setDeletingItem(null);
  };

  // Données mockées pour le développement
  const mockSensors = [
    { _id: '1', sensorId: 'S001', name: 'Capteur Salon', type: 'temperature', status: 'active', batteryLevel: 87, lastMaintenance: '2023-03-15', userId: 'U001' },
    { _id: '2', sensorId: 'S002', name: 'Capteur Cuisine', type: 'humidity', status: 'active', batteryLevel: 92, lastMaintenance: '2023-02-20', userId: 'U001' },
    { _id: '3', sensorId: 'S003', name: 'Capteur Chambre', type: 'temperature', status: 'maintenance', batteryLevel: 45, lastMaintenance: '2023-04-05', userId: 'U002' },
    { _id: '4', sensorId: 'S004', name: 'Capteur Entrée', type: 'motion', status: 'inactive', batteryLevel: 12, lastMaintenance: '2023-01-10', userId: 'U003' },
    { _id: '5', sensorId: 'S005', name: 'Capteur Salle de bain', type: 'humidity', status: 'active', batteryLevel: 78, lastMaintenance: '2023-03-28', userId: 'U002' },
  ];

  const mockUsers = [
    { _id: 'U001', name: 'Jean Dupont', email: 'jean.dupont@example.com', address: '12 Rue de Paris, 75001 Paris', phone: '01 23 45 67 89', registrationDate: '2022-11-15' },
    { _id: 'U002', name: 'Marie Martin', email: 'marie.martin@example.com', address: '45 Avenue des Lilas, 69006 Lyon', phone: '04 56 78 90 12', registrationDate: '2023-01-20' },
    { _id: 'U003', name: 'Pierre Durand', email: 'pierre.durand@example.com', address: '8 Boulevard Clemenceau, 33000 Bordeaux', phone: '05 67 89 01 23', registrationDate: '2022-09-05' },
  ];

  // Utilisation des données mockées pour le développement
  const displaySensors = sensors.length ? sensors : mockSensors;
  const displayUsers = users.length ? users : mockUsers;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Administration</h1>
      
      {/* Onglets */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button 
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'sensors'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('sensors')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Capteurs
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Utilisateurs
            </button>
          </li>
        </ul>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 mb-6">
        <div className="w-full md:w-64 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {activeTab === 'sensors' && (
          <div className="flex space-x-3">
            <select
              className="py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            
            <select
              className="py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        )}
        
        <button className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Ajouter {activeTab === 'sensors' ? 'un capteur' : 'un utilisateur'}
        </button>
      </div>
      
      {/* Tableau des capteurs */}
      {activeTab === 'sensors' && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSensors.map((sensor) => (
                  <tr key={sensor._id}>
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sensor.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : sensor.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
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
                      {new Date(sensor.lastMaintenance).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sensor.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(sensor)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Éditer
                      </button>
                      <button 
                        onClick={() => setDeletingItem(sensor)}
                        className="text-red-600 hover:text-red-900"
                      >
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
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredSensors.length / itemsPerPage)}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === Math.ceil(filteredSensors.length / itemsPerPage) 
                      ? 'bg-gray-100 text-gray-400' 
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
                    sur <span className="font-medium">{filteredSensors.length}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
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
                          ? 'bg-gray-100 text-gray-400' 
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
      )}
      
      {/* Tableau des utilisateurs */}
      {activeTab === 'users' && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresse
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Éditer
                      </button>
                      <button 
                        onClick={() => setDeletingItem(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination pour les utilisateurs */}
          {filteredUsers.length > itemsPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              {/* Code de pagination (similaire à celui des capteurs) */}
            </div>
          )}
        </div>
      )}
      
      {/* Modal d'édition */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {activeTab === 'sensors' ? 'Éditer le capteur' : 'Éditer l\'utilisateur'}
                    </h3>
                    <div className="mt-4">
                      {activeTab === 'sensors' ? (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Nom
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.name || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                              Type
                            </label>
                            <select
                              id="type"
                              name="type"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={formData.type || ''}
                              onChange={handleInputChange}
                            >
                              <option value="temperature">Température</option>
                              <option value="humidity">Humidité</option>
                              <option value="motion">Mouvement</option>
                              <option value="light">Lumière</option>
                              <option value="door">Porte</option>
                              <option value="window">Fenêtre</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                              Statut
                            </label>
                            <select
                              id="status"
                              name="status"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={formData.status || ''}
                              onChange={handleInputChange}
                            >
                              <option value="active">Actif</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="inactive">Inactif</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="batteryLevel" className="block text-sm font-medium text-gray-700">
                              Niveau de batterie (%)
                            </label>
                            <input
                              type="number"
                              name="batteryLevel"
                              id="batteryLevel"
                              min="0"
                              max="100"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.batteryLevel || 0}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Nom
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.name || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.email || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                              Adresse
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.address || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Téléphone
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={formData.phone || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSave}
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelEdit}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de suppression */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Confirmer la suppression
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer {activeTab === 'sensors' ? 'ce capteur' : 'cet utilisateur'} ? Cette action est irréversible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelDelete}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
