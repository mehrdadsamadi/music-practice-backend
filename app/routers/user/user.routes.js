const { MessageRoutes } = require('./message.routes');
const { PracticeRoutes } = require('./practice.routes');
const { ScoreRoutes } = require('./score.routes');

const router = require('express').Router();

router.use("/score", ScoreRoutes)
router.use("/message", MessageRoutes)
router.use("/practice", PracticeRoutes)

module.exports = {
    UserRoutes: router
}