const { UserController } = require('../../controllers/user/user.controller');

const router = require('express').Router();

router.get("/get-all", UserController.getAllUsers)

module.exports = {
    UserInfoRoutes: router
}