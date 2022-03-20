const { Router } =require('express');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware'); 
const authController = require('../controllers/authController');
const router = Router()


router.get('*', checkUser);
router.get('/',authController.home_get);
router.get('/more',requireAuth,authController.more_get);

router.get('/login',authController.login_get )
router.post('/login',authController.login_post )

router.get('/signup',authController.signup_get)

router.post('/signup', authController.signup_post)

router.get('/logout',authController.logout_get)





module.exports = router;