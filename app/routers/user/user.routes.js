const { ScoreRoutes } = require('./score.routes');

const router = require('express').Router();

router.use("/score", ScoreRoutes)

module.exports = {
    UserRoutes: router
}