const Router = require('express');
const router = Router();

const {
    getAllUser,
    getUserById,
    deleteUser,
    updateUserById
} = require('../controllers/user.controller.js');


router.route('/').get(getAllUser);
router.route('/:userId').get(getUserById);
router.route('/:id').delete(deleteUser);
router.route('/:userID').patch(updateUserById);

module.exports = router;