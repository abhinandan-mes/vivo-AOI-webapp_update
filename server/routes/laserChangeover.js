const express = require('express');
const router = express.Router();
const laserController = require('../controllers/LaserChangeoverController');
const { requireRoles } = require('../middleware/auth');

const validateSubmit = (req, res, next) => {
  const { line, group_name, program_name, date, shift, submitted_by } = req.body;
  const errors = [];
  if (!line) errors.push({ msg: 'Line is required' });
  if (!group_name) errors.push({ msg: 'Group is required' });
  if (!program_name) errors.push({ msg: 'Program Name is required' });
  if (!date || isNaN(Date.parse(date))) errors.push({ msg: 'Valid date required' });
  if (!shift) errors.push({ msg: 'Shift is required' });
  if (!submitted_by) errors.push({ msg: 'Submitted by is required' });
  
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};

router.post('/', requireRoles(['technician', 'engineer', 'super_admin']), validateSubmit, laserController.createChecksheet);
router.get('/pending', requireRoles(['engineer', 'admin', 'super_admin', 'production_group_leader']), laserController.getPending);
router.put('/:id/review', requireRoles(['engineer', 'production_group_leader', 'super_admin']), laserController.reviewChecksheet);
router.get('/reports', laserController.getReports);

module.exports = router;
