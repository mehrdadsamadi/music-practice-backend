const { AuthController } = require('../../controllers/auth/auth.controller');

const router = require('express').Router();

router.post("/get-otp", AuthController.getOtp)
router.post("/check-otp", AuthController.checkOtp)

module.exports = {
    AuthRoutes: router
}