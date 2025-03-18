// server/models/Sensor.js
const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'humidity', 'pressure', 'light', 'motion', 'door', 'window']
  },
  name: {
    type: String,
    required: true
  },
  location: {
    room: String,
    floor: Number
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  lastMaintenance: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);

// server/controllers/sensorController.js
const Sensor = require('../models/Sensor');

// Get all sensors
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensors', error: error.message });
  }
};

// Get sensor by id
exports.getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensor', error: error.message });
  }
};

// Create new sensor
exports.createSensor = async (req, res) => {
  try {
    const newSensor = new Sensor(req.body);
    const savedSensor = await newSensor.save();
    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sensor', error: error.message });
  }
};

// Update sensor
exports.updateSensor = async (req, res) => {
  try {
    const updatedSensor = await Sensor.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedSensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json(updatedSensor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sensor', error: error.message });
  }
};

// Delete sensor
exports.deleteSensor = async (req, res) => {
  try {
    const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
    if (!deletedSensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json({ message: 'Sensor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sensor', error: error.message });
  }
};

// Get sensors by type
exports.getSensorsByType = async (req, res) => {
  try {
    const sensors = await Sensor.find({ type: req.params.type });
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensors by type', error: error.message });
  }
};

// Get sensors by user
exports.getSensorsByUser = async (req, res) => {
  try {
    const sensors = await Sensor.find({ userId: req.params.userId });
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensors by user', error: error.message });
  }
};

// Get sensors by status
exports.getSensorsByStatus = async (req, res) => {
  try {
    const sensors = await Sensor.find({ status: req.params.status });
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensors by status', error: error.message });
  }
};

// Get sensors stats (count by type, status)
exports.getSensorsStats = async (req, res) => {
  try {
    const typeStats = await Sensor.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    
    const statusStats = await Sensor.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    const totalCount = await Sensor.countDocuments();
    
    res.status(200).json({
      total: totalCount,
      byType: typeStats,
      byStatus: statusStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensor stats', error: error.message });
  }
};

// server/routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Base route: /api/sensors

// GET all sensors
router.get('/', sensorController.getAllSensors);

// GET sensor by ID
router.get('/:id', sensorController.getSensorById);

// POST create new sensor
router.post('/', sensorController.createSensor);

// PUT update sensor
router.put('/:id', sensorController.updateSensor);

// DELETE sensor
router.delete('/:id', sensorController.deleteSensor);

// GET sensors by type
router.get('/type/:type', sensorController.getSensorsByType);

// GET sensors by user
router.get('/user/:userId', sensorController.getSensorsByUser);

// GET sensors by status
router.get('/status/:status', sensorController.getSensorsByStatus);

// GET sensors stats
router.get('/stats/all', sensorController.getSensorsStats);

module.exports = router;