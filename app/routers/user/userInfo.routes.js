const { UserController } = require('../../controllers/user/user.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", can([PERMISSIONS.ADMIN]), UserController.getAllUsers)

module.exports = {
    UserInfoRoutes: router
}