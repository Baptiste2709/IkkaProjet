import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  // États pour gérer les onglets et formulaires
  const [activeTab, setActiveTab] = useState('users');
  const [userForm, setUserForm] = useState({
    username: '',
    location: '',
    personsInHouse: 1,
    houseSize: 'small'
  });
  const [sensorForm, setSensorForm] = useState({
    location: 'bedroom',
    userId: '',
    creationDate: new Date().toISOString().split('T')[0]
  });
  const [measureForm, setMeasureForm] = useState({
    type: 'temperature',
    sensorID: '',
    value: 0,
    creationDate: new Date().toISOString().split('T')[0]
  });
  
  // États pour gérer les listes
  const [users, setUsers] = useState([
    { id: '5ddb94c6fc13ae640c000014', location: 'ethiopia', personsInHouse: 4, houseSize: 'medium' },
    { id: '5ddb94c6fc13ae640c000015', location: 'czech republic', personsInHouse: 6, houseSize: 'small' },
    { id: '5ddb94c6fc13ae640c000016', location: 'italy', personsInHouse: 2, houseSize: 'big' }
  ]);
  const [sensors, setSensors] = useState([
    { id: '5ddba05efc13ae6c90000064', creationDate: '10/9/2024', location: 'bedroom', userID: '5ddb94c6fc13ae640c000027' },
    { id: '5ddba05efc13ae6c90000065', creationDate: '8/30/2024', location: 'livingroom', userID: '5ddb94c6fc13ae640c000026' },
    { id: '5ddba05efc13ae6c90000066', creationDate: '7/2/2024', location: 'livingroom', userID: '5ddb94c6fc13ae640c000025' }
  ]);
  const [measures, setMeasures] = useState([
    { id: '5ddbaac6fc13ae4b49000000', type: 'humidity', creationDate: '2024-08-20T06:03:32Z', sensorID: '5ddba05efc13ae6c9000006b', value: 30 },
    { id: '5ddbaac6fc13ae4b49000001', type: 'temperature', creationDate: '2024-01-19T16:01:36Z', sensorID: '5ddba05ffc13ae6c900000a5', value: 4 },
    { id: '5ddbaac6fc13ae4b49000002', type: 'temperature', creationDate: '2024-09-24T00:25:42Z', sensorID: '5ddba05ffc13ae6c900000c3', value: 6 }
  ]);
  
  // Fonctions pour gérer les formulaires
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: name === 'personsInHouse' ? parseInt(value) : value
    });
  };
  
  const handleSensorFormChange = (e) => {
    const { name, value } = e.target;
    setSensorForm({
      ...sensorForm,
      [name]: value
    });
  };
  
  const handleMeasureFormChange = (e) => {
    const { name, value } = e.target;
    setMeasureForm({
      ...measureForm,
      [name]: name === 'value' ? parseFloat(value) : value
    });
  };
  
  // Fonctions pour soumettre les formulaires
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `5ddb94c6fc13ae640c${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      ...userForm
    };
    setUsers([...users, newUser]);
    setUserForm({
      username: '',
      location: '',
      personsInHouse: 1,
      houseSize: 'small'
    });
    alert('Utilisateur ajouté avec succès!');
  };
  
  const handleSensorSubmit = (e) => {
    e.preventDefault();
    const newSensor = {
      id: `5ddba05efc13ae6c9${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      ...sensorForm
    };
    setSensors([...sensors, newSensor]);
    setSensorForm({
      location: 'bedroom',
      userId: '',
      creationDate: new Date().toISOString().split('T')[0]
    });
    alert('Capteur ajouté avec succès!');
  };
  
  const handleMeasureSubmit = (e) => {
    e.preventDefault();
    const newMeasure = {
      id: `5ddbaac6fc13ae4b4${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      ...measureForm,
      creationDate: new Date(measureForm.creationDate).toISOString()
    };
    setMeasures([...measures, newMeasure]);
    setMeasureForm({
      type: 'temperature',
      sensorID: '',
      value: 0,
      creationDate: new Date().toISOString().split('T')[0]
    });
    alert('Mesure ajoutée avec succès!');
  };
  
  // Fonctions pour supprimer des éléments
  const deleteUser = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  const deleteSensor = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce capteur?')) {
      setSensors(sensors.filter(sensor => sensor.id !== id));
    }
  };
  
  const deleteMeasure = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mesure?')) {
      setMeasures(measures.filter(measure => measure.id !== id));
    }
  };
  
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration P.E.IoT</h1>
        <p className="admin-subtitle">
          Gérez vos capteurs, utilisateurs et mesures
        </p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Utilisateurs
        </button>
        <button 
          className={`admin-tab ${activeTab === 'sensors' ? 'active' : ''}`}
          onClick={() => setActiveTab('sensors')}
        >
          Capteurs
        </button>
        <button 
          className={`admin-tab ${activeTab === 'measures' ? 'active' : ''}`}
          onClick={() => setActiveTab('measures')}
        >
          Mesures
        </button>
      </div>
      
      <div className="admin-content">
        {/* Gestion des utilisateurs */}
        {activeTab === 'users' && (
          <div className="admin-panel">
            <div className="admin-form-container">
              <h2>Ajouter un utilisateur</h2>
              <form onSubmit={handleUserSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userForm.username}
                    onChange={handleUserFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Localisation</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={userForm.location}
                    onChange={handleUserFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="personsInHouse">Personnes dans le foyer</label>
                  <input
                    type="number"
                    id="personsInHouse"
                    name="personsInHouse"
                    min="1"
                    max="10"
                    value={userForm.personsInHouse}
                    onChange={handleUserFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="houseSize">Taille de la maison</label>
                  <select
                    id="houseSize"
                    name="houseSize"
                    value={userForm.houseSize}
                    onChange={handleUserFormChange}
                    required
                  >
                    <option value="small">Petite</option>
                    <option value="medium">Moyenne</option>
                    <option value="big">Grande</option>
                  </select>
                </div>
                
                <button type="submit" className="submit-button">Ajouter</button>
              </form>
            </div>
            
            <div className="admin-list-container">
              <h2>Liste des utilisateurs</h2>
              <div className="admin-list">
                <div className="list-header">
                  <div className="list-cell">ID</div>
                  <div className="list-cell">Localisation</div>
                  <div className="list-cell">Personnes</div>
                  <div className="list-cell">Taille</div>
                  <div className="list-cell">Actions</div>
                </div>
                
                {users.map((user) => (
                  <div key={user.id} className="list-row">
                    <div className="list-cell id-cell">{user.id.substring(user.id.length - 6)}</div>
                    <div className="list-cell">{user.location}</div>
                    <div className="list-cell">{user.personsInHouse}</div>
                    <div className="list-cell">{user.houseSize}</div>
                    <div className="list-cell actions-cell">
                      <button 
                        className="action-button delete-button"
                        onClick={() => deleteUser(user.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Gestion des capteurs */}
        {activeTab === 'sensors' && (
          <div className="admin-panel">
            <div className="admin-form-container">
              <h2>Ajouter un capteur</h2>
              <form onSubmit={handleSensorSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="location">Emplacement</label>
                  <select
                    id="location"
                    name="location"
                    value={sensorForm.location}
                    onChange={handleSensorFormChange}
                    required
                  >
                    <option value="bedroom">Chambre</option>
                    <option value="livingroom">Salon</option>
                    <option value="bathroom">Salle de bain</option>
                    <option value="entrance">Entrée</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="userId">Utilisateur</label>
                  <select
                    id="userId"
                    name="userId"
                    value={sensorForm.userId}
                    onChange={handleSensorFormChange}
                    required
                  >
                    <option value="">-- Sélectionner un utilisateur --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username || user.location} (ID: {user.id.substring(user.id.length - 6)})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="creationDate">Date d'installation</label>
                  <input
                    type="date"
                    id="creationDate"
                    name="creationDate"
                    value={sensorForm.creationDate}
                    onChange={handleSensorFormChange}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-button">Ajouter</button>
              </form>
            </div>
            
            <div className="admin-list-container">
              <h2>Liste des capteurs</h2>
              <div className="admin-list">
                <div className="list-header">
                  <div className="list-cell">ID</div>
                  <div className="list-cell">Emplacement</div>
                  <div className="list-cell">Date</div>
                  <div className="list-cell">User ID</div>
                  <div className="list-cell">Actions</div>
                </div>
                
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="list-row">
                    <div className="list-cell id-cell">{sensor.id.substring(sensor.id.length - 6)}</div>
                    <div className="list-cell">{sensor.location}</div>
                    <div className="list-cell">{sensor.creationDate}</div>
                    <div className="list-cell">{sensor.userID.substring(sensor.userID.length - 6)}</div>
                    <div className="list-cell actions-cell">
                      <button 
                        className="action-button delete-button"
                        onClick={() => deleteSensor(sensor.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Gestion des mesures */}
        {activeTab === 'measures' && (
          <div className="admin-panel">
            <div className="admin-form-container">
              <h2>Ajouter une mesure</h2>
              <form onSubmit={handleMeasureSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="type">Type de mesure</label>
                  <select
                    id="type"
                    name="type"
                    value={measureForm.type}
                    onChange={handleMeasureFormChange}
                    required
                  >
                    <option value="temperature">Température</option>
                    <option value="humidity">Humidité</option>
                    <option value="airPollution">Pollution de l'air</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sensorID">Capteur</label>
                  <select
                    id="sensorID"
                    name="sensorID"
                    value={measureForm.sensorID}
                    onChange={handleMeasureFormChange}
                    required
                  >
                    <option value="">-- Sélectionner un capteur --</option>
                    {sensors.map((sensor) => (
                      <option key={sensor.id} value={sensor.id}>
                        ID: {sensor.id.substring(sensor.id.length - 6)} ({sensor.location})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="value">Valeur</label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    step="0.1"
                    value={measureForm.value}
                    onChange={handleMeasureFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="measureDate">Date de mesure</label>
                  <input
                    type="date"
                    id="creationDate"
                    name="creationDate"
                    value={measureForm.creationDate}
                    onChange={handleMeasureFormChange}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-button">Ajouter</button>
              </form>
            </div>
            
            <div className="admin-list-container">
              <h2>Liste des mesures</h2>
              <div className="admin-list">
                <div className="list-header">
                  <div className="list-cell">ID</div>
                  <div className="list-cell">Type</div>
                  <div className="list-cell">Valeur</div>
                  <div className="list-cell">Date</div>
                  <div className="list-cell">Capteur</div>
                  <div className="list-cell">Actions</div>
                </div>
                
                {measures.map((measure) => (
                  <div key={measure.id} className="list-row">
                    <div className="list-cell id-cell">{measure.id.substring(measure.id.length - 6)}</div>
                    <div className="list-cell">{measure.type}</div>
                    <div className="list-cell">{measure.value}</div>
                    <div className="list-cell">{new Date(measure.creationDate).toLocaleDateString()}</div>
                    <div className="list-cell">{measure.sensorID.substring(measure.sensorID.length - 6)}</div>
                    <div className="list-cell actions-cell">
                      <button 
                        className="action-button delete-button"
                        onClick={() => deleteMeasure(measure.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;