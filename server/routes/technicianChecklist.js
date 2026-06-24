const express = require('express');
const technicianChecklistController = require('../controllers/TechnicianChecklistController');

const router = express.Router();

router.post('/checklist', technicianChecklistController.createChecklist);
router.get('/checklist', technicianChecklistController.getAllChecklists);
router.get('/checklist/:id', technicianChecklistController.getChecklistById);
router.get('/checklist/date/:date', technicianChecklistController.getChecklistsByDate);
router.get('/checklist/line/:line', technicianChecklistController.getChecklistsByLine);

module.exports = router;
