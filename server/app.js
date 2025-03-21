const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour permettre les requêtes cross-origin (CORS)
app.use(cors());
app.use(express.json());

// Route pour récupérer toutes les mesures
app.get('/api/measures', (req, res) => {
  try {
    // Lire le fichier JSON
    const measuresData = fs.readFileSync(
      path.join(__dirname, 'resources/Measure.json'),
      'utf8'
    );
    
    // Transformer le contenu en objet JavaScript
    const measures = JSON.parse(measuresData);
    
    // Envoyer les données au format JSON
    res.json(measures);
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les capteurs et utilisateurs
app.get('/api/sensors', (req, res) => {
  try {
    const sensorsData = fs.readFileSync(
      path.join(__dirname, 'resources/Sensor.json'),
      'utf8'
    );
    const sensors = JSON.parse(sensorsData);
    res.json(sensors);
  } catch (error) {
    console.error('Erreur lors de la lecture des capteurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const usersData = fs.readFileSync(
      path.join(__dirname, 'resources/User.json'),
      'utf8'
    );
    const users = JSON.parse(usersData);
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la lecture des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});