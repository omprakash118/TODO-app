const Router = require('express');
const router = Router();

const {
    createTask,
    updateTask,
    getAllTask,
    deleteTask
} = require('../controllers/task.controller.js');



router.route('/').get(getAllTask);
router.route('/').post(createTask);
router.route('/:taskID').patch(updateTask);
router.route('/:taskID').delete(deleteTask);

module.exports = router;