const { FestivalController } = require('../../controllers/festival/festival.controller');

const router = require('express').Router();

router.get("/get-all", FestivalController.getAllFestivals)
router.get("/get/:festivalId", FestivalController.getOneFestival)
router.post("/add", FestivalController.createFestival)
router.patch("/update/:festivalId", FestivalController.updateFestival)
router.delete("/remove/:festivalId", FestivalController.deleteFestival)

module.exports = {
    FestivalRoutes: router
}