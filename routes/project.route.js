const express = require('express');
const router = express.Router();

const project_controller = require('../controllers/project.controller');



router.get('/test', project_controller.test);
router.post('/create', project_controller.project_create);
router.get('/:id', project_controller.project_details);
router.put('/:id/update', project_controller.project_update);
router.delete('/:id/delete', project_controller.project_delete);
router.get('/', project_controller.project_all);
router.get('/search/:title', project_controller.project_search);
module.exports = router;