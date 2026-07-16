const express = require('express');
const technicianChecklistController = require('../controllers/TechnicianChecklistController');
const { validateChecklist } = require('../middleware/validation');
const { requireRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/checklist', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), validateChecklist, technicianChecklistController.createChecklist);
router.get('/checklist/pending', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), technicianChecklistController.getPendingChecklists);
router.get('/checklist', technicianChecklistController.getAllChecklists);
router.get('/checklist/:id', technicianChecklistController.getChecklistById);
router.get('/checklist/date/:date', technicianChecklistController.getChecklistsByDate);
router.get('/checklist/line/:line', technicianChecklistController.getChecklistsByLine);
router.put('/checklist/:id', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), technicianChecklistController.updateChecklist);
router.delete('/checklist/:id', requireRoles(['super_admin']), technicianChecklistController.deleteChecklist);

module.exports = router;
