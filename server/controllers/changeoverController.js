const changeoverChecksheetModel = require('../models/ChangeoverChecksheet');
const { logActivity } = require('../utils/activityLogger');

const changeoverController = {
  createChecksheet: async (req, res) => {
    try {
      // Note: Duplicate checks are disabled per user request, allowing multiple submissions for the same line/shift/day

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
        const changeoverKeys = [
          'line', 'group_name', 'date', 'shift', 'model_name', 'model_code', 'changeover_type',
          'spi_steel_stencil_suffix_match', 'spi_program_subpanel_serial_match', 'spi_recheck_pcab_polarity', 'spi_confirm_parameter_settings', 'spi_read_barcode_on',
          'pre_aoi_eco_checklists', 'pre_aoi_program_model_modify', 'pre_aoi_vi_program_new_materia', 'pre_aoi_limit_defective_alarm', 'pre_aoi_test_program_bare_pcba', 'pre_aoi_bot_program_serial_number', 'pre_aoi_read_barcode_on', 'pre_aoi_confirm_materials_mounted', 'pre_aoi_delete_all_zones',
          'post_aoi_equipment_model', 'post_aoi_eco_checklists', 'post_aoi_program_model_modify', 'post_aoi_recheck_chips_standard_models', 'post_aoi_scan_board_picture', 'post_aoi_limit_defective_alarm', 'post_aoi_confirm_polarity_shield', 'post_aoi_bot_program_serial_number', 'post_aoi_registered_standard_models_times',
          'others_adjust_widths', 'others_add_test_standard_pcb_barcode',
          'status', 'remarks'
        ];

        const getDisplayVal = val => {
          if (val === true) return 'True';
          if (val === false) return 'False';
          return val !== null && val !== undefined ? String(val) : '—';
        };

        changeoverKeys.forEach(key => {
          if (fields[key] !== undefined && fields[key] !== original[key]) {
            modified.push({
              field: key,
              from: getDisplayVal(original[key]),
              to: getDisplayVal(fields[key])
            });
          }
        });

        const updatePayload = {
          ...fields,
          approval_status: action === 'approve' ? 'APPROVED' : 'DISAPPROVED',
          engineer_remarks: engineer_remarks || null,
          engineer_modified_fields: modified.length > 0 ? JSON.stringify(modified) : null
        };

        const updated = await changeoverChecksheetModel.update(targetId, updatePayload);

        await logActivity(
          action === 'approve' ? 'CHANGEOVER_APPROVE' : 'CHANGEOVER_DISAPPROVE',
          username,
          req,
          `Line: ${updated.line}, Shift: ${updated.shift}, Action: ${action.toUpperCase()}`
        );

        return res.status(200).json({ success: true, data: updated });
      } else if (role === 'technician') {
        const updatePayload = {
          ...fields,
          approval_status: 'ENG_PENDING',
          engineer_remarks: null
        };

        const updated = await changeoverChecksheetModel.update(targetId, updatePayload);

        await logActivity(
          'CHANGEOVER_RESUBMIT',
          username,
          req,
          `Line: ${updated.line}, Shift: ${updated.shift}, Resubmitted by Technician`
        );

        return res.status(200).json({ success: true, data: updated });
      } else {
        const updated = await changeoverChecksheetModel.update(targetId, fields);
        await logActivity(
          'CHANGEOVER_UPDATE',
          username,
          req,
          `Line: ${updated.line}, Shift: ${updated.shift}, Admin Update`
        );
        return res.status(200).json({ success: true, data: updated });
      }
    } catch (error) {
      console.error('Error updating checksheet:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = changeoverController;
