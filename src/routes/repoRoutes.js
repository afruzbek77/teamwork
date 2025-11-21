const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');

router.post('/:projectId/file/add', repoController.addFile);
router.put('/:projectId/file/update', repoController.updateFile);
router.get('/:projectId/files', repoController.listFiles);

module.exports = router;