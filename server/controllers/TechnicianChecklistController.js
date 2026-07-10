const technicianChecklistModel = require('../models/TechnicianChecklist');
const { logActivity } = require('../utils/activityLogger');

const technicianChecklistController = {
  createChecklist: async (req, res) => {
    try {
      // Check for duplicate submission (date, line, shift)
      const existing = await technicianChecklistModel.checkDuplicate(req.body.date, req.body.line, req.body.shift);
      if (existing) {
        return res.status(400).json({
          success: false,
          error: `Duplicate Submission: Checklist for Line ${req.body.line} during ${req.body.shift} shift has already been submitted for this date.`
        });
      }

      const checklist = await technicianChecklistModel.create(req.body);

      // Log the submission activity
      await logActivity(
        'CHECKLIST_SUBMIT', 
        req.user?.username, 
        req, 
        `Line: ${checklist.line}, Shift: ${checklist.shift}, Status: ${checklist.status}, Group: ${checklist.group_name}`
      );

      res.status(201).json({ success: true, data: checklist });
    } catch (error) {
      console.error('Error creating checklist:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  deleteChecklist: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checklist ID' });
      }

      // Role check: Only super_admin is authorized to delete
      if (req.user?.role !== 'super_admin') {
        return res.status(403).json({ success: false, error: 'Unauthorized: Only Super Admin can delete checklist data' });
      }

      const checklist = await technicianChecklistModel.getById(targetId);
      if (!checklist) {
        return res.status(404).json({ success: false, error: 'Checklist not found' });
      }

      await technicianChecklistModel.delete(targetId);

      // Log activity
      await logActivity(
        'CHECKLIST_DELETE',
        req.user?.username,
        req,
        `Deleted checklist ID: ${targetId} for Line: ${checklist.line}, Shift: ${checklist.shift}`
      );

      res.status(200).json({ success: true, message: 'Checklist deleted successfully' });
    } catch (error) {
      console.error('Error deleting checklist:', error);
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
