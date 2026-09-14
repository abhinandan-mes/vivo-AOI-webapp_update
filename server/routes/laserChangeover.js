const express = require('express');
const router = express.Router();
const laserController = require('../controllers/LaserChangeoverController');
const { requireRoles } = require('../middleware/auth');
const { body } = require('express-validator');

const validateSubmit = [
  body('line').notEmpty().withMessage('Line is required'),
  body('program_name').notEmpty().withMessage('Program Name is required'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('shift').notEmpty().withMessage('Shift is required'),
  body('submitted_by').notEmpty()
];

router.post('/', requireRoles(['technician', 'engineer', 'super_admin']), validateSubmit, laserController.createChecksheet);
router.get('/pending', requireRoles(['engineer', 'admin', 'super_admin', 'production_group_leader']), laserController.getPending);
router.put('/:id/review', requireRoles(['engineer', 'production_group_leader', 'super_admin']), laserController.reviewChecksheet);
router.get('/reports', laserController.getReports);

module.exports = router;
