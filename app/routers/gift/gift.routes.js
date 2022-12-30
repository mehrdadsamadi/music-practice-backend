const { GiftController } = require('../../controllers/gift/gift.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", GiftController.getAllGifts)
router.get("/get/:giftId", GiftController.getOneGift)
router.post("/add", can([PERMISSIONS.ADMIN]), GiftController.createGift)
router.patch("/update/:giftId", can([PERMISSIONS.ADMIN]), GiftController.updateGift)
router.patch("/receive/:userId/:giftId/:status", can([PERMISSIONS.ADMIN]), GiftController.receiveGift)
router.delete("/remove/:giftId", can([PERMISSIONS.ADMIN]), GiftController.removeGift)

module.exports = {
    GiftRoutes: router
}