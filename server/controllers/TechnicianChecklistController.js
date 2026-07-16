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

      // Backup technician original data for engineer modifications diff tracking
      req.body.original_technician_data = JSON.stringify(req.body);

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
  },

  getPendingChecklists: async (req, res) => {
    try {
      const { role, username } = req.user;
      let checklists;
      if (role === 'engineer') {
        checklists = await technicianChecklistModel.getPendingForEngineer(username);
      } else if (role === 'technician') {
        checklists = await technicianChecklistModel.getPendingForTechnician(username);
      } else {
        checklists = await technicianChecklistModel.getAllPending();
      }
      res.status(200).json({ success: true, data: checklists });
    } catch (error) {
      console.error('Error fetching pending checklists:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  updateChecklist: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checklist ID' });
      }

      const existing = await technicianChecklistModel.getById(targetId);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Checklist not found' });
      }

      const { role, username } = req.user;
      const { action, engineer_remarks, ...fields } = req.body;

      if (role === 'engineer') {
        if (action !== 'approve' && action !== 'disapprove') {
          return res.status(400).json({ success: false, error: 'Invalid action. Must be approve or disapprove.' });
        }

        if (action === 'disapprove' && !engineer_remarks?.trim()) {
          return res.status(400).json({ success: false, error: 'Remarks are mandatory for disapproval.' });
        }

        let original = {};
        try {
          original = JSON.parse(existing.original_technician_data || '{}');
        } catch (e) {
          original = existing;
        }

        const modified = [];
        const checklistKeys = [
          'pre_aoi_program_full_name', 'stencil_serial_no_b_side', 'stencil_serial_no_a_side',
          'barcode_read_a_layer', 'barcode_read_a_spi', 'barcode_read_a_pre_aoi',
          'barcode_read_b_layer', 'barcode_read_b_spi', 'barcode_read_b_pre_aoi',
          'workorder_info_pre_aoi', 'workorder_info_post_aoi', 'aoi_scan_tools_workorder_traceability',
          'confirmation', 'status', 'line', 'group_name'
        ];

        checklistKeys.forEach(key => {
          if (fields[key] !== undefined && fields[key] !== original[key]) {
            modified.push({
              field: key,
              from: original[key] !== null ? original[key] : '—',
              to: fields[key] !== null ? fields[key] : '—'
            });
          }
        });

        const updatePayload = {
          ...fields,
          approval_status: action === 'approve' ? 'APPROVED' : 'DISAPPROVED',
          engineer_remarks: engineer_remarks || null,
          engineer_modified_fields: modified.length > 0 ? JSON.stringify(modified) : null
        };

        const updated = await technicianChecklistModel.update(targetId, updatePayload);

        await logActivity(
          action === 'approve' ? 'CHECKLIST_APPROVE' : 'CHECKLIST_DISAPPROVE',
          username,
          req,
          `Line: ${updated.line}, Shift: ${updated.shift}, Action: ${action.toUpperCase()}`
        );

        return res.status(200).json({ success: true, data: updated });

      } else if (role === 'technician') {
        const dup = await technicianChecklistModel.checkDuplicate(fields.date || existing.date, fields.line || existing.line, fields.shift || existing.shift);
        if (dup && dup.id !== targetId) {
          return res.status(400).json({
            success: false,
            error: `Duplicate Submission: Checklist for Line ${fields.line || existing.line} during ${fields.shift || existing.shift} shift has already been submitted for this date.`
          });
        }

        const updatePayload = {
          ...fields,
          approval_status: 'ENG_PENDING',
          engineer_remarks: null,
          engineer_modified_fields: null,
          original_technician_data: JSON.stringify({ ...existing, ...fields })
        };

        const updated = await technicianChecklistModel.update(targetId, updatePayload);

        await logActivity(
          'CHECKLIST_RESUBMIT',
          username,
          req,
          `Resubmitted checklist ID: ${targetId} for Line: ${updated.line}, Shift: ${updated.shift}`
        );

        return res.status(200).json({ success: true, data: updated });
      } else {
        const updated = await technicianChecklistModel.update(targetId, fields);
        return res.status(200).json({ success: true, data: updated });
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = technicianChecklistController;
