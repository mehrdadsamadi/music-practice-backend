const { FestivalController } = require('../../controllers/festival/festival.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", FestivalController.getAllFestivals)
router.get("/get/:festivalId", FestivalController.getOneFestival)
router.get("/giving-gifts/:festivalId", can([PERMISSIONS.ADMIN]), FestivalController.givingGifts)
router.get("/get-ranking/:festivalId", FestivalController.getFestivalRanking)
router.get("/active", FestivalController.getActiveFestival)
router.patch("/add-user/:festivalId", FestivalController.addUserToFestival)
router.post("/add", can([PERMISSIONS.ADMIN]), FestivalController.createFestival)
router.patch("/update/:festivalId", can([PERMISSIONS.ADMIN]), FestivalController.updateFestival)
router.delete("/remove/:festivalId", can([PERMISSIONS.ADMIN]), FestivalController.deleteFestival)

module.exports = {
    FestivalRoutes: router
}