const changeoverChecksheetModel = require('../models/ChangeoverChecksheet');
const { logActivity } = require('../utils/activityLogger');

const changeoverController = {
  createChecksheet: async (req, res) => {
    try {
      // Check for duplicate submission (date, line, shift)
      const existing = await changeoverChecksheetModel.checkDuplicate(req.body.date, req.body.line, req.body.shift);
      if (existing) {
        return res.status(400).json({
          success: false,
          error: `Duplicate Submission: Changeover Checksheet for Line ${req.body.line} during ${req.body.shift} shift has already been submitted for this date.`
        });
      }

      // Backup technician original data for engineer modifications diff tracking
      req.body.original_technician_data = JSON.stringify(req.body);

      const checksheet = await changeoverChecksheetModel.create(req.body);
      
      // Log the submission activity
      await logActivity(
        'CHANGEOVER_SUBMIT', 
        req.user?.username, 
        req, 
        `Line: ${checksheet.line}, Shift: ${checksheet.shift}, Status: ${checksheet.status}, Group: ${checksheet.group_name}`
      );

      res.status(201).json({ success: true, data: checksheet });
    } catch (error) {
      console.error('Error creating changeover checksheet:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  deleteChecksheet: async (req, res) => {
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

      const checksheet = await changeoverChecksheetModel.getById(targetId);
      if (!checksheet) {
        return res.status(404).json({ success: false, error: 'Checksheet not found' });
      }

      await changeoverChecksheetModel.delete(targetId);

      // Log activity
      await logActivity(
        'CHANGEOVER_DELETE',
        req.user?.username,
        req,
        `Deleted changeover checksheet ID: ${targetId} for Line: ${checksheet.line}, Shift: ${checksheet.shift}`
      );

      res.status(200).json({ success: true, message: 'Changeover Checksheet deleted successfully' });
    } catch (error) {
      console.error('Error deleting changeover checksheet:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getAllChecksheets: async (req, res) => {
    try {
      const checksheets = await changeoverChecksheetModel.getAll();
      res.status(200).json({ success: true, data: checksheets });
    } catch (error) {
      console.error('Error listing changeover checksheets:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getChecksheetById: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checksheet ID' });
      }

      const checksheet = await changeoverChecksheetModel.getById(targetId);
      if (!checksheet) return res.status(404).json({ success: false, error: 'Checksheet not found' });
      res.status(200).json({ success: true, data: checksheet });
    } catch (error) {
      console.error('Error fetching checksheet:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getChecksheetsByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid date parameter' });
      }

      const checksheets = await changeoverChecksheetModel.getByDate(date);
      res.status(200).json({ success: true, data: checksheets });
    } catch (error) {
      console.error('Error fetching checksheets by date:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  getPendingChecksheets: async (req, res) => {
    try {
      const { role, username } = req.user;
      let checksheets;
      if (role === 'engineer') {
        checksheets = await changeoverChecksheetModel.getPendingForEngineer(username);
      } else if (role === 'technician') {
        checksheets = await changeoverChecksheetModel.getPendingForTechnician(username);
      } else {
        checksheets = await changeoverChecksheetModel.getAllPending();
      }
      res.status(200).json({ success: true, data: checksheets });
    } catch (error) {
      console.error('Error fetching pending checksheets:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  updateChecksheet: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checksheet ID' });
      }

      const existing = await changeoverChecksheetModel.getById(targetId);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Checksheet not found' });
      }

      const updated = await changeoverChecksheetModel.update(targetId, req.body);

      // Log the update activity
      let actionType = 'CHANGEOVER_UPDATE';
      if (req.body.approval_status === 'APPROVED' || req.body.approval_status === 'DISAPPROVED') {
        actionType = `CHANGEOVER_${req.body.approval_status}`;
      }
      
      await logActivity(
        actionType,
        req.user?.username,
        req,
        `Line: ${updated.line}, Shift: ${updated.shift}, Status: ${updated.approval_status}`
      );

      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      console.error('Error updating checksheet:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = changeoverController;
