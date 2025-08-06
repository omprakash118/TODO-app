const Router = require('express');
const router = Router();


const {
    loginUser,
    registerUser,
    logout
} = require('../controllers/auth.controller');


// router.get('/' , getAllUser);

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(logout);



module.exports = router;
