const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createProject, getProject, inviteCollaborator } = require('../controllers/projectController');
router.post('/create', auth, createProject);
router.get('/:id', auth, getProject);
router.post('/:id/invite', auth, inviteCollaborator);
module.exports = router;