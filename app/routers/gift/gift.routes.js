const { GiftController } = require('../../controllers/gift/gift.controller');

const router = require('express').Router();

router.get("/get-all", GiftController.getAllGifts)
router.post("/add", GiftController.createGift)
router.patch("/update/:giftId", GiftController.updateGift)
router.delete("/remove/:giftId", GiftController.removeGift)

module.exports = {
    GiftRoutes: router
}