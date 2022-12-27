const { GiftController } = require('../../controllers/user/gift.controller');

const router = require('express').Router();

router.get("/get-all", GiftController.getAllUserGifts)
router.patch("/buy/:giftId", GiftController.buyGift)

module.exports = {
    GiftRoutes: router
}