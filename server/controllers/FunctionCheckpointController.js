const functionCheckpointModel = require('../models/FunctionCheckpoint');

const functionCheckpointController = {
  createCheckpoint: async (req, res) => {
    try {
      const checkpoint = await functionCheckpointModel.create(req.body);
      res.status(201).json({ success: true, data: checkpoint });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllCheckpoints: async (req, res) => {
    try {
      const checkpoints = await functionCheckpointModel.getAll();
      res.status(200).json({ success: true, data: checkpoints });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getCheckpointById: async (req, res) => {
    try {
      const checkpoint = await functionCheckpointModel.getById(req.params.id);
      if (!checkpoint) return res.status(404).json({ success: false, error: 'Not found' });
      res.status(200).json({ success: true, data: checkpoint });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getCheckpointsByDate: async (req, res) => {
    try {
      const checkpoints = await functionCheckpointModel.getByDate(req.params.date);
      res.status(200).json({ success: true, data: checkpoints });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = functionCheckpointController;
