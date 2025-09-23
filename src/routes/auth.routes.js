import {Router} from "express"
import {registerUser,login,logoutUser, verifyEmail, refreshAccessToken, forgetPasswordRequest, resetForgotPassword, getCurrentUser, changeCurrentPassword, resendEmailVerification} from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()
//unsecure route 
router.route("/register").post(userRegisterValidator(),validate,registerUser)
router.route("/login").post(userLoginValidator(),validate,login)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password").post(userForgotPasswordValidator(), validate,forgetPasswordRequest)
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(),validate, resetForgotPassword)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/change-password").get(verifyJWT, userChangeCurrentPasswordValidator(), validate,changeCurrentPassword)
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification)


export default router