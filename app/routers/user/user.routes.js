const { MessageRoutes } = require('./message.routes');
const { ScoreRoutes } = require('./score.routes');

const router = require('express').Router();

router.use("/score", ScoreRoutes)
router.use("/message", MessageRoutes)

module.exports = {
    UserRoutes: router
}