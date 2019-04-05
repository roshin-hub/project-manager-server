const express = require('express');
const router = express.Router();

const task_controller = require('../controllers/task.controller');

router.get('/test', task_controller.test);
router.post('/create', task_controller.task_create);
router.get('/:id', task_controller.task_details);
router.put('/:id/update', task_controller.task_update);
router.delete('/:id/delete', task_controller.task_delete);
router.get('/', task_controller.task_all);
router.get('/search/:title', task_controller.task_search);
module.exports = router;