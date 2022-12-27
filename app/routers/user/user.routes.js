const { GiftRoutes } = require('./gift.routes');
const { MessageRoutes } = require('./message.routes');
const { PracticeRoutes } = require('./practice.routes');
const { ScoreRoutes } = require('./score.routes');
const { UserInfoRoutes } = require('./userInfo.routes');

const router = require('express').Router();

router.use("/", UserInfoRoutes)
router.use("/score", ScoreRoutes)
router.use("/practice", PracticeRoutes)
router.use("/gift", GiftRoutes)
router.use("/message", MessageRoutes)

module.exports = {
    UserRoutes: router
}