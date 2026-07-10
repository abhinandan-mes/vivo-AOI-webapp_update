const functionCheckpointModel = require('../models/FunctionCheckpoint');
const { logActivity } = require('../utils/activityLogger');

const functionCheckpointController = {
  createCheckpoint: async (req, res) => {
    try {
      // Check for duplicate submission (date, line, shift)
      const existing = await functionCheckpointModel.checkDuplicate(req.body.date, req.body.line, req.body.shift);
      if (existing) {
        return res.status(400).json({
          success: false,
          error: `Duplicate Submission: Checksheet for Line ${req.body.line} during ${req.body.shift} shift has already been submitted for this date.`
        });
      }

      const checkpoint = await functionCheckpointModel.create(req.body);
      
      // Log the submission activity
      await logActivity(
        'CHECKPOINT_SUBMIT', 
        req.user?.username, 
        req, 
        `Line: ${checkpoint.line}, Shift: ${checkpoint.shift}, Status: ${checkpoint.status}, Group: ${checkpoint.group_name}`
      );

      res.status(201).json({ success: true, data: checkpoint });
    } catch (error) {
      console.error('Error creating checkpoint:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  deleteCheckpoint: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checksheet ID' });
      }

      // Role check: Only super_admin is authorized to delete
      if (req.user?.role !== 'super_admin') {
        return res.status(403).json({ success: false, error: 'Unauthorized: Only Super Admin can delete checksheet data' });
      }

      const checkpoint = await functionCheckpointModel.getById(targetId);
      if (!checkpoint) {
        return res.status(404).json({ success: false, error: 'Checkpoint not found' });
      }

      await functionCheckpointModel.delete(targetId);

      // Log activity
      await logActivity(
        'CHECKPOINT_DELETE',
        req.user?.username,
        req,
        `Deleted checksheet ID: ${targetId} for Line: ${checkpoint.line}, Shift: ${checkpoint.shift}`
      );

      res.status(200).json({ success: true, message: 'Checksheet deleted successfully' });
    } catch (error) {
      console.error('Error deleting checkpoint:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getAllCheckpoints: async (req, res) => {
    try {
      const checkpoints = await functionCheckpointModel.getAll();
      res.status(200).json({ success: true, data: checkpoints });
    } catch (error) {
      console.error('Error listing checkpoints:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getCheckpointById: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checkpoint ID' });
      }

      const checkpoint = await functionCheckpointModel.getById(targetId);
      if (!checkpoint) return res.status(404).json({ success: false, error: 'Checkpoint not found' });
      res.status(200).json({ success: true, data: checkpoint });
    } catch (error) {
      console.error('Error fetching checkpoint:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getCheckpointsByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid date parameter' });
      }

      const checkpoints = await functionCheckpointModel.getByDate(date);
      res.status(200).json({ success: true, data: checkpoints });
    } catch (error) {
      console.error('Error fetching checkpoints by date:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = functionCheckpointController;
