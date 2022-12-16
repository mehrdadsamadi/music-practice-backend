const { FestivalController } = require('../../controllers/festival/festival.controller');
const { can } = require('../../middlewares/can.guard');
const { verifyAccessToken } = require('../../middlewares/verifyAccessToken');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", FestivalController.getAllFestivals)
router.get("/get/:festivalId", FestivalController.getOneFestival)
router.patch("/add-user/:festivalId", verifyAccessToken, FestivalController.addUserToFestival)
router.post("/add", verifyAccessToken, can([PERMISSIONS.ADMIN]), FestivalController.createFestival)
router.patch("/update/:festivalId", verifyAccessToken, can([PERMISSIONS.ADMIN]), FestivalController.updateFestival)
router.delete("/remove/:festivalId", verifyAccessToken, can([PERMISSIONS.ADMIN]), FestivalController.deleteFestival)

module.exports = {
    FestivalRoutes: router
}