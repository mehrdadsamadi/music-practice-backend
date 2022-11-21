const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { AuthRoutes } = require('./auth/auth.routes');
const { InstrumentRoutes } = require('./instrument/instrument.routes');
const { PermissionRoutes } = require('./rbac/permission.routes');
const { RoleRoutes } = require('./rbac/role.routes');

const router = require('express').Router();

router.use("/user", AuthRoutes)
router.use("/instrument", verifyAccessToken, InstrumentRoutes)
router.use("/role", verifyAccessToken, RoleRoutes)
router.use("/permission", verifyAccessToken, PermissionRoutes)

module.exports = {
    AllRoutes: router
}