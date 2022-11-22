const { can } = require('../middlewares/can.guard');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { PERMISSIONS } = require('../utils/constants');
const { AuthRoutes } = require('./auth/auth.routes');
const { GiftRoutes } = require('./gift/gift.routes');
const { InstrumentRoutes } = require('./instrument/instrument.routes');
const { PermissionRoutes } = require('./rbac/permission.routes');
const { RoleRoutes } = require('./rbac/role.routes');

const router = require('express').Router();

router.use("/auth", AuthRoutes)
router.use("/instrument", can([PERMISSIONS.ADMIN]), verifyAccessToken, InstrumentRoutes)
router.use("/gift", can([PERMISSIONS.ADMIN]), verifyAccessToken, GiftRoutes)
router.use("/role", can([PERMISSIONS.ADMIN]), verifyAccessToken, RoleRoutes)
router.use("/permission", can([PERMISSIONS.ADMIN]), verifyAccessToken, PermissionRoutes)

module.exports = {
    AllRoutes: router
}