const express= require('express');
const router = express.Router()
const {upload} = require('../middlewares/imageStorage')
const user= require('../controller/userController')
const validate = require('../validation/user/user_validation')
const auth = require('../middlewares/auth_middleware')


 router.post('/registerUser', upload.single("profilepic"), user.userSignup)
//router.post('/registerUser', user.userSignup)
//router.post('/userLogin', validate.userLoginValidation , user.userLogin)
router.post('/userLogin', user.userLogin)
//router.post('/send-reset-password-email', auth.checkUserAuth , user.sendUserRestPasswordEmail)
 router.post('/send-reset-password-email',user.sendUserResetPasswordEmail)
router.post('/reset-password', user.userPasswordReset)

module.exports = router;
 