// UsersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // État pour l'affichage détaillé
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Effet pour filtrer et trier les utilisateurs
  useEffect(() => {
    let result = [...users];
    
    // Filtrage
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.includes(searchTerm))
      );
    }
    
    // Tri
    result.sort((a, b) => {
      let compareResult = 0;
      
      if (sortBy === 'name') {
        compareResult = a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        compareResult = a.email.localeCompare(b.email);
      } else if (sortBy === 'registrationDate') {
        compareResult = new Date(a.registrationDate) - new Date(b.registrationDate);
      }
      
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    
    setFilteredUsers(result);
  }, [users, searchTerm, sortBy, sortDirection]);
  
  // Calcul pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
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
  const mockUsers = [
    { _id: 'U001', name: 'Jean Dupont', email: 'jean.dupont@example.com', address: '12 Rue de Paris, 75001 Paris', phone: '01 23 45 67 89', registrationDate: '2022-11-15', sensorCount: 5, activeStatus: true },
    { _id: 'U002', name: 'Marie Martin', email: 'marie.martin@example.com', address: '45 Avenue des Lilas, 69006 Lyon', phone: '04 56 78 90 12', registrationDate: '2023-01-20', sensorCount: 3, activeStatus: true },
    { _id: 'U003', name: 'Pierre Durand', email: 'pierre.durand@example.com', address: '8 Boulevard Clemenceau, 33000 Bordeaux', phone: '05 67 89 01 23', registrationDate: '2022-09-05', sensorCount: 2, activeStatus: false },
    { _id: 'U004', name: 'Sophie Leroy', email: 'sophie.leroy@example.com', address: '32 Rue Victor Hugo, 59000 Lille', phone: '03 45 67 89 01', registrationDate: '2023-02-12', sensorCount: 6, activeStatus: true },
    { _id: 'U005', name: 'Thomas Moreau', email: 'thomas.moreau@example.com', address: '18 Avenue Jean Jaurès, 31000 Toulouse', phone: '05 12 34 56 78', registrationDate: '2022-10-08', sensorCount: 4, activeStatus: true },
    { _id: 'U006', name: 'Julie Girard', email: 'julie.girard@example.com', address: '25 Rue de la République, 13001 Marseille', phone: '04 23 45 67 89', registrationDate: '2023-03-01', sensorCount: 1, activeStatus: true },
    { _id: 'U007', name: 'Nicolas Petit', email: 'nicolas.petit@example.com', address: '7 Place Bellecour, 69002 Lyon', phone: '04 34 56 78 90', registrationDate: '2022-12-15', sensorCount: 0, activeStatus: false },
  ];
  
  // Utiliser les données mockées si aucune donnée réelle n'est disponible
  useEffect(() => {
    if (!loading && users.length === 0) {
      setUsers(mockUsers);
    }
  }, [loading, users]);
  
  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };
  
  const handleCloseDetails = () => {
    setSelectedUser(null);
  };
  
  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error && users.length === 0) {
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
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des utilisateurs</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Ajouter un utilisateur
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
                placeholder="Rechercher par nom, email ou téléphone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
      
      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                  <div className="flex items-center">
                    Email
                    {sortBy === 'email' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('registrationDate')}>
                  <div className="flex items-center">
                    Date d'inscription
                    {sortBy === 'registrationDate' && (
                      <svg className={`ml-1 w-4 h-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capteurs
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-500">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.sensorCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.activeStatus ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(user)}
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
        {filteredUsers.length > itemsPerPage && (
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
                disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage) 
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
                    {Math.min(indexOfLastItem, filteredUsers.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredUsers.length}</span> utilisateurs
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
                  
                  {[...Array(Math.ceil(filteredUsers.length / itemsPerPage)).keys()].map((number) => (
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
                    disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                      currentPage === Math.ceil(filteredUsers.length / itemsPerPage) 
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
      
      {/* Modal de détails de l'utilisateur */}
      {selectedUser && (
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
                      Détails de l'utilisateur
                    </h3>
                    
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold mr-4">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xl font-medium">{selectedUser.name}</h4>
                        <p className="text-sm text-gray-500">{selectedUser._id}</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${selectedUser.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedUser.activeStatus ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Informations de contact</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">Email:</span>
                            <p className="text-sm font-medium">{selectedUser.email}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Téléphone:</span>
                            <p className="text-sm font-medium">{selectedUser.phone}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Adresse:</span>
                            <p className="text-sm font-medium">{selectedUser.address}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Informations du compte</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">Date d'inscription:</span>
                            <p className="text-sm font-medium">{new Date(selectedUser.registrationDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Capteurs:</span>
                            <p className="text-sm font-medium">{selectedUser.sensorCount} capteurs installés</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Dernière connexion:</span>
                            <p className="text-sm font-medium">23/03/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Liste des capteurs</h4>
                      {selectedUser.sensorCount > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {/* Exemple de capteurs liés à l'utilisateur */}
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">S00{selectedUser._id.slice(-1)}1</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">Capteur Salon</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">Température</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Actif</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">S00{selectedUser._id.slice(-1)}2</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">Capteur Cuisine</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">Humidité</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Actif</span>
                              </td>
                            </tr>
                            {selectedUser.sensorCount > 2 && (
                              <tr>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">S00{selectedUser._id.slice(-1)}3</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">Capteur Chambre</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">Température</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Maintenance</span>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center py-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Aucun capteur associé à cet utilisateur</p>
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
                  onClick={() => {/* Éditer l'utilisateur */}}
                >
                  Éditer
                </button>
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

export default UsersPage;