const { ScoreController } = require('../../controllers/user/score.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all/:userId", ScoreController.getAllScores)
router.get("/get/:scoreId", ScoreController.getOneScore)
router.patch("/add/:userId", can([PERMISSIONS.ADMIN]), ScoreController.addScore)
router.patch("/update/:scoreId", can([PERMISSIONS.ADMIN]), ScoreController.updateScore)
router.delete("/remove/:scoreId", can([PERMISSIONS.ADMIN]), ScoreController.deleteScore)

module.exports = {
    ScoreRoutes: router
}