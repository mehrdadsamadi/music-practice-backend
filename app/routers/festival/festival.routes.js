const { FestivalController } = require('../../controllers/festival/festival.controller');
const { stringToArray } = require('../../middlewares/stringToArray');

const router = require('express').Router();

router.get("/get-all", FestivalController.getAllFestivals)
router.get("/get/:festivalId", FestivalController.getOneFestival)
router.post("/add", stringToArray("gifts"), stringToArray("users"),FestivalController.createFestival)
router.patch("/update/:festivalId", FestivalController.updateFestival)
router.delete("/remove/:festivalId", FestivalController.deleteFestival)

module.exports = {
    FestivalRoutes: router
}