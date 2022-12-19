const { can } = require('../middlewares/can.guard');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { PERMISSIONS } = require('../utils/constants');
const { AuthRoutes } = require('./auth/auth.routes');
const { FestivalRoutes } = require('./festival/festival.routes');
const { GiftRoutes } = require('./gift/gift.routes');
const { InstrumentRoutes } = require('./instrument/instrument.routes');
const { PermissionRoutes } = require('./rbac/permission.routes');
const { RoleRoutes } = require('./rbac/role.routes');
const { TimeGoalRoutes } = require('./timeGoal/timeGoal.routes');
const { UserRoutes } = require('./user/user.routes');

const router = require('express').Router();

router.use("/auth", AuthRoutes)
router.use("/instrument", InstrumentRoutes)
router.use("/gift", verifyAccessToken, GiftRoutes)
router.use("/festival", FestivalRoutes)
router.use("/timeGoal", verifyAccessToken, TimeGoalRoutes)
router.use("/user", verifyAccessToken, UserRoutes)
router.use("/role", verifyAccessToken, can([PERMISSIONS.ADMIN]), RoleRoutes)
router.use("/permission", verifyAccessToken, can([PERMISSIONS.ADMIN]), PermissionRoutes)

module.exports = {
    AllRoutes: router
}