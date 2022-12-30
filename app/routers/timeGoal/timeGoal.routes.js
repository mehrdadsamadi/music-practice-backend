const { timeGoalController } = require('../../controllers/timeGoal/timeGoal.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", timeGoalController.getAllUserTimeGoal)
router.get("/get-all-admin", can([PERMISSIONS.ADMIN]), timeGoalController.getAllTimeGoal)
router.get("/get/:timeGoalId", timeGoalController.getOneTimeGoal)
router.post("/add", can([PERMISSIONS.ADMIN]), timeGoalController.createTimeGoal)
router.patch("/update/:timeGoalId", can([PERMISSIONS.ADMIN]), timeGoalController.updateTimeGoal)
router.delete("/remove/:timeGoalId", can([PERMISSIONS.ADMIN]), timeGoalController.deleteTimeGoal)

module.exports = {
    TimeGoalRoutes: router
}