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

      // Backup technician original data for engineer modifications diff tracking
      req.body.original_technician_data = JSON.stringify(req.body);

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
  },

  getPendingCheckpoints: async (req, res) => {
    try {
      const { role, username } = req.user;
      let checkpoints;
      if (role === 'engineer') {
        checkpoints = await functionCheckpointModel.getPendingForEngineer(username);
      } else if (role === 'technician') {
        checkpoints = await functionCheckpointModel.getPendingForTechnician(username);
      } else {
        checkpoints = await functionCheckpointModel.getAllPending();
      }
      res.status(200).json({ success: true, data: checkpoints });
    } catch (error) {
      console.error('Error fetching pending checkpoints:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  },

  updateCheckpoint: async (req, res) => {
    try {
      const { id } = req.params;
      const targetId = parseInt(id);
      if (isNaN(targetId)) {
        return res.status(400).json({ success: false, error: 'Invalid checkpoint ID' });
      }

      const existing = await functionCheckpointModel.getById(targetId);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Checkpoint not found' });
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
        const checkpointKeys = [
          'line', 'group_name', 'date', 'shift', 'responsible_person', 'time', 'status',
          'laser_barcode_before_bot', 'laser_barcode_before_top', 'laser_barcode_after_bot', 'laser_barcode_after_top',
          'laser_pcb_text_before', 'laser_pcb_text_after',
          'spi_barcode_before_bot', 'spi_barcode_before_top', 'spi_barcode_after_bot', 'spi_barcode_after_top',
          'spi_mes_before_bot', 'spi_mes_before_top', 'spi_mes_after_bot', 'spi_mes_after_top',
          'pre_aoi_barcode_before_bot', 'pre_aoi_barcode_before_top', 'pre_aoi_barcode_after_bot', 'pre_aoi_barcode_after_top',
          'post_aoi_barcode_before_bot', 'post_aoi_barcode_before_top', 'post_aoi_barcode_after_bot', 'post_aoi_barcode_after_top',
          'password_function_pre_aoi_before', 'password_function_pre_aoi_after',
          'spi_fov_before', 'spi_fov_after',
          'pre_aoi_fov_before', 'pre_aoi_fov_after',
          'post_aoi_fov_before', 'post_aoi_fov_after',
          'pre_aoi_spc_before', 'pre_aoi_spc_after'
        ];

        const getDisplayVal = val => {
          if (val === true) return 'Yes';
          if (val === false) return 'No';
          return val !== null && val !== undefined ? String(val) : '—';
        };

        checkpointKeys.forEach(key => {
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

        const updated = await functionCheckpointModel.update(targetId, updatePayload);

        await logActivity(
          action === 'approve' ? 'CHECKPOINT_APPROVE' : 'CHECKPOINT_DISAPPROVE',
          username,
          req,
          `Line: ${updated.line}, Shift: ${updated.shift}, Action: ${action.toUpperCase()}`
        );

        return res.status(200).json({ success: true, data: updated });

      } else if (role === 'technician') {
        const dup = await functionCheckpointModel.checkDuplicate(fields.date || existing.date, fields.line || existing.line, fields.shift || existing.shift);
        if (dup && dup.id !== targetId) {
          return res.status(400).json({
            success: false,
            error: `Duplicate Submission: Checksheet for Line ${fields.line || existing.line} during ${fields.shift || existing.shift} shift has already been submitted for this date.`
          });
        }

        const updatePayload = {
          ...fields,
          approval_status: 'ENG_PENDING',
          engineer_remarks: null,
          engineer_modified_fields: null,
          original_technician_data: JSON.stringify({ ...existing, ...fields })
        };

        const updated = await functionCheckpointModel.update(targetId, updatePayload);

        await logActivity(
          'CHECKPOINT_RESUBMIT',
          username,
          req,
          `Resubmitted checksheet ID: ${targetId} for Line: ${updated.line}, Shift: ${updated.shift}`
        );

        return res.status(200).json({ success: true, data: updated });
      } else {
        const updated = await functionCheckpointModel.update(targetId, fields);
        return res.status(200).json({ success: true, data: updated });
      }
    } catch (error) {
      console.error('Error updating checkpoint:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  }
};

module.exports = functionCheckpointController;
