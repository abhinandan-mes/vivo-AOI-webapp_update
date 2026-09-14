const LaserChangeover = require('../models/LaserChangeover');
const { validationResult } = require('express-validator');

exports.createChecksheet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const data = { ...req.body };
    data.date = new Date(data.date);
    data.approval_status = 'ENG_PENDING';
    const newChecksheet = await LaserChangeover.create(data);
    res.status(201).json({ message: 'Checksheet submitted successfully', data: newChecksheet });
  } catch (error) {
    console.error('Error creating laser changeover:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPending = async (req, res) => {
  try {
    const role = req.user.role;
    let pending = [];
    if (role === 'engineer' || role === 'admin' || role === 'super_admin') {
      pending = await LaserChangeover.findPendingForEngineer();
    } else if (role === 'production_group_leader') {
      pending = await LaserChangeover.findPendingForGroupLeader();
    }
    res.json({ data: pending });
  } catch (error) {
    console.error('Error fetching pending laser changeovers:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.reviewChecksheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, engineer_remarks, pd_remarks, grp_ldr_prog_name_check, grp_ldr_laser_position_check } = req.body;
    const userRole = req.user.role;
    
    const checksheet = await LaserChangeover.findById(id);
    if (!checksheet) return res.status(404).json({ error: 'Checksheet not found' });

    let updateData = {};

    if (userRole === 'engineer') {
      if (checksheet.approval_status !== 'ENG_PENDING') return res.status(400).json({ error: 'Not waiting for engineer' });
      
      if (action === 'approve') {
        updateData.approval_status = 'GRP_LDR_PENDING';
        updateData.engineer_signature = req.user.full_name;
        updateData.designated_engineer_id = req.user.username;
        if (engineer_remarks) updateData.engineer_remarks = engineer_remarks;
      } else {
        updateData.approval_status = 'REJECTED';
        updateData.status = 'Line Stop';
        updateData.engineer_signature = req.user.full_name;
        if (engineer_remarks) updateData.engineer_remarks = engineer_remarks;
      }
    } else if (userRole === 'production_group_leader') {
      if (checksheet.approval_status !== 'GRP_LDR_PENDING') return res.status(400).json({ error: 'Not waiting for group leader' });

      if (action === 'approve') {
        updateData.approval_status = 'APPROVED';
        updateData.status = 'Production';
        updateData.group_leader_signature = req.user.full_name;
        updateData.designated_group_leader_id = req.user.username;
        if (pd_remarks !== undefined) updateData.pd_remarks = pd_remarks;
        if (grp_ldr_prog_name_check !== undefined) updateData.grp_ldr_prog_name_check = grp_ldr_prog_name_check;
        if (grp_ldr_laser_position_check !== undefined) updateData.grp_ldr_laser_position_check = grp_ldr_laser_position_check;
      } else {
        updateData.approval_status = 'REJECTED';
        updateData.status = 'Line Stop';
        updateData.group_leader_signature = req.user.full_name;
        if (pd_remarks !== undefined) updateData.pd_remarks = pd_remarks;
      }
    } else {
      return res.status(403).json({ error: 'Unauthorized to review' });
    }

    const updated = await LaserChangeover.update(id, updateData);
    res.json({ message: 'Review submitted', data: updated });
  } catch (error) {
    console.error('Error reviewing laser changeover:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { fromDate, toDate, line, shift, status } = req.query;
    let whereClause = {};

    if (fromDate && toDate) {
      whereClause.date = { gte: new Date(fromDate), lte: new Date(toDate) };
    }
    if (line) whereClause.line = line;
    if (shift) whereClause.shift = shift;
    if (status) {
      if (status === 'Pending Review') {
         // Could be pending engineer or group leader
         whereClause.approval_status = { in: ['ENG_PENDING', 'GRP_LDR_PENDING'] };
      } else if (status === 'Approved') {
         whereClause.approval_status = 'APPROVED';
      } else if (status === 'Rejected') {
         whereClause.approval_status = 'REJECTED';
      } else {
         whereClause.status = status;
      }
    }

    const records = await LaserChangeover.findAllFilters(whereClause);
    res.json({ data: records });
  } catch (error) {
    console.error('Error fetching laser changeovers:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
