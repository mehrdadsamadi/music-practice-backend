const { AuthRoutes } = require('./auth/auth.routes');

const router = require('express').Router();

router.use("/user", AuthRoutes)

module.exports = {
    AllRoutes: router
}