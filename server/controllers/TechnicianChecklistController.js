const technicianChecklistModel = require('../models/TechnicianChecklist');

const technicianChecklistController = {
  createChecklist: async (req, res) => {
    try {
      const checklist = await technicianChecklistModel.create(req.body);
      res.status(201).json({ success: true, data: checklist });
    } catch (error) {
      console.error('Error creating checklist:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getAllChecklists: async (req, res) => {
    try {
      const checklists = await technicianChecklistModel.getAll();
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      console.error('Error listing checklists:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getChecklistById: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checklist ID' });
      }

      const checklist = await technicianChecklistModel.getById(targetId);
      if (!checklist) return res.status(404).json({ success: false, error: 'Checklist not found' });
      res.status(200).json({ success: true, data: checklist });
    } catch (error) {
      console.error('Error fetching checklist:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getChecklistsByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid date parameter' });
      }

      const checklists = await technicianChecklistModel.getByDate(date);
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      console.error('Error fetching checklists by date:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getChecklistsByLine: async (req, res) => {
    try {
      const { line } = req.params;
      const checklists = await technicianChecklistModel.getByLine(line);
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      console.error('Error fetching checklists by line:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = technicianChecklistController;
