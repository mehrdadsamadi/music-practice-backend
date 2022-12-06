const { timeGoalController } = require('../../controllers/timeGoal/timeGoal.controller');
const { can } = require('../../middlewares/can.guard');
const { verifyAccessToken } = require('../../middlewares/verifyAccessToken');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", timeGoalController.getAllTimeGoal)
router.get("/get/:timeGoalId", timeGoalController.getOneTimeGoal)
router.post("/add", verifyAccessToken, can([PERMISSIONS.ADMIN]), timeGoalController.createTimeGoal)
router.patch("/update/:timeGoalId", verifyAccessToken, can([PERMISSIONS.ADMIN]), timeGoalController.updateTimeGoal)
router.delete("/remove/:timeGoalId", verifyAccessToken, can([PERMISSIONS.ADMIN]), timeGoalController.deleteTimeGoal)

module.exports = {
    TimeGoalRoutes: router
}