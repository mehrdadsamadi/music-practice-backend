const { PracticeController } = require('../../controllers/user/practice.controller');

const router = require('express').Router();

router.get("/get-all/:userId", PracticeController.getAllPractices)
router.get("/get/:practiceId", PracticeController.getOnePractice)
router.patch("/add/:userId", PracticeController.addPractice)
router.patch("/update/:practiceId", PracticeController.updatePractice)
router.delete("/remove/:practiceId", PracticeController.deletePractice)

module.exports = {
    PracticeRoutes: router
}