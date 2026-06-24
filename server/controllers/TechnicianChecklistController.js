const technicianChecklistModel = require('../models/TechnicianChecklist');

const technicianChecklistController = {
  createChecklist: async (req, res) => {
    try {
      const checklist = await technicianChecklistModel.create(req.body);
      res.status(201).json({ success: true, data: checklist });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllChecklists: async (req, res) => {
    try {
      const checklists = await technicianChecklistModel.getAll();
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getChecklistById: async (req, res) => {
    try {
      const checklist = await technicianChecklistModel.getById(req.params.id);
      if (!checklist) return res.status(404).json({ success: false, error: 'Not found' });
      res.status(200).json({ success: true, data: checklist });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getChecklistsByDate: async (req, res) => {
    try {
      const checklists = await technicianChecklistModel.getByDate(req.params.date);
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getChecklistsByLine: async (req, res) => {
    try {
      const checklists = await technicianChecklistModel.getByLine(req.params.line);
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = technicianChecklistController;
