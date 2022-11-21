const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { AuthRoutes } = require('./auth/auth.routes');
const { InstrumentRoutes } = require('./instrument/instrument.routes');

const router = require('express').Router();

router.use("/user", AuthRoutes)
router.use("/instrument", verifyAccessToken, InstrumentRoutes)

module.exports = {
    AllRoutes: router
}