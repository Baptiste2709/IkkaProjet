const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/measures', (req, res) => {
  const filePath = path.join(__dirname, '../../rules/resources/Measure.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data);
});

module.exports = router;