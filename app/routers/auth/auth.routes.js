const { AuthController } = require('../../controllers/auth/auth.controller');
const { verifyAccessToken } = require('../../middlewares/verifyAccessToken');

const router = require('express').Router();

router.post("/get-otp", AuthController.getOtp)
router.post("/check-otp", AuthController.checkOtp)
router.patch("/set-password", verifyAccessToken, AuthController.setPassword)
router.post("/login", AuthController.loginWithPassword)
router.get("/get-user", AuthController.getLoginUser)

module.exports = {
    AuthRoutes: router
}