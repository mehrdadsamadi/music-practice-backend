const { ScoreController } = require('../../controllers/user/score.controller');

const router = require('express').Router();

router.get("/get-all/:userId", ScoreController.getAllScores)
router.get("/get/:scoreId", ScoreController.getOneScore)
router.patch("/add/:userId", ScoreController.addScore)
router.patch("/update/:scoreId", ScoreController.updateScore)
router.delete("/remove/:scoreId", ScoreController.deleteScore)

module.exports = {
    ScoreRoutes: router
}