const Router = require('express');
const router = Router();
const verifyJWT = require('../middleware/auth.middleware');

const {
    createGroup,
    getAllGroup,
    deleteGroup,
    getGroupById,
    addMembers,
    removeMembers,
    getGroupMembers
} = require('../controllers/group.controller');



router.route('/new').post(verifyJWT, createGroup);
router.route('/').get(getAllGroup);
router.route('/:groupID').get(getGroupById);
router.route('/:groupID').delete(verifyJWT, deleteGroup);
router.route('/addMembers').post(verifyJWT, addMembers);    
router.route('/removeMembers').post(verifyJWT, removeMembers);
router.route('/members/:groupID').get(getGroupMembers);

module.exports = router;