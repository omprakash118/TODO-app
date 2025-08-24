const Router = require('express');
const router = Router();

const {
    createGroup,
    getAllGroup,
    deleteGroup,
    getGroupById,
    addMembers,
    removeMembers
} = require('../controllers/group.controller');

router.route('/new').post(createGroup);
router.route('/').get(getAllGroup);
router.route('/:groupID').get(getGroupById);
router.route('/:groupID').delete(deleteGroup);
router.route('/addMembers').post(addMembers);
router.route('/removeMembers').patch(removeMembers);

module.exports = router;