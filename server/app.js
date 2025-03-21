const express = require('express');
const app = express();
const cors = require('cors'); // Si pas déjà installé: npm install cors
const measuresRoutes = require('./routes/measures');

// Configuration de base
app.use(express.json());
app.use(cors()); // Pour éviter les problèmes CORS pendant le développement

// Routes
app.use('/api/measures', measuresRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur', message: err.message });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});