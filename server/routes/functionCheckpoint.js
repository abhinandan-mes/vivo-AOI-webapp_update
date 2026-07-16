const express = require('express');
const functionCheckpointController = require('../controllers/FunctionCheckpointController');
const { validateCheckpoint } = require('../middleware/validation');
const { requireRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/checkpoint', requireRoles(['technician', 'admin', 'super_admin']), validateCheckpoint, functionCheckpointController.createCheckpoint);
router.get('/checkpoint/pending', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), functionCheckpointController.getPendingCheckpoints);
router.get('/checkpoint', functionCheckpointController.getAllCheckpoints);
router.get('/checkpoint/:id', functionCheckpointController.getCheckpointById);
router.get('/checkpoint/date/:date', functionCheckpointController.getCheckpointsByDate);
router.put('/checkpoint/:id', requireRoles(['technician', 'engineer', 'admin', 'super_admin']), functionCheckpointController.updateCheckpoint);
router.delete('/checkpoint/:id', requireRoles(['super_admin']), functionCheckpointController.deleteCheckpoint);

module.exports = router;
