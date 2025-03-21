const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    // Ajuste ce chemin selon la structure exacte de ton projet
    const filePath = path.resolve(__dirname, '../../rules/resources/Measure.json');
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(filePath)) {
      console.error(`Le fichier n'existe pas: ${filePath}`);
      return res.status(404).json({ error: 'Fichier non trouvé' });
    }
    
    // Lire le fichier brut
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Assurons-nous que c'est un JSON valide avant de l'envoyer
    try {
      const jsonData = JSON.parse(fileContent);
      res.json(jsonData); // Envoie le JSON déjà parsé
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      // Si une erreur survient, renvoyer le début du fichier pour débogage
      res.status(500).json({ 
        error: 'Erreur de parsing JSON',
        filePreview: fileContent.slice(0, 200) // Les 200 premiers caractères pour débogage
      });
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur serveur', message: error.message });
  }
});

module.exports = router;