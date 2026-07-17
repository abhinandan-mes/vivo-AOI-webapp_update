const express = require('express');
const changeoverController = require('../controllers/changeoverController');
const { requireRoles } = require('../middleware/auth');

const router = express.Router();

// Allow all authenticated roles to submit (except inspector)
router.post('/changeover', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), changeoverController.createChecksheet);
router.get('/changeover/pending', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), changeoverController.getPendingChecksheets);
router.get('/changeover', changeoverController.getAllChecksheets);
router.get('/changeover/:id', changeoverController.getChecksheetById);
router.get('/changeover/date/:date', changeoverController.getChecksheetsByDate);
router.put('/changeover/:id', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), changeoverController.updateChecksheet);
router.delete('/changeover/:id', requireRoles(['super_admin']), changeoverController.deleteChecksheet);

module.exports = router;
