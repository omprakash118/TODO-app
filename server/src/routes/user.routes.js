const Router = require('express');
const router = Router();

const {
    getAllUser,
    getUserById,
    deleteUser,
    updateUserById
} = require('../controllers/user.controller.js');
const { route } = require('./auth.rutes');


router.route('/').get(getAllUser);
router.route('/:id').get(getUserById);
router.route('/:id').delete(deleteUser);
router.route('/:id').patch(updateUserById);

module.exports = router;