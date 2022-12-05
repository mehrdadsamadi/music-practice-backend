const { MessageController } = require('../../controllers/user/message.controller');
const { can } = require('../../middlewares/can.guard');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all/:userId", can([PERMISSIONS.ADMIN]), MessageController.getAllMessages)
router.get("/get/:messageId", can([PERMISSIONS.ADMIN]), MessageController.getOneMessage)
router.patch("/seen/:userId", MessageController.seenMessage)
router.patch("/add/:userId", can([PERMISSIONS.ADMIN]), MessageController.addMessage)
router.patch("/update/:messageId", can([PERMISSIONS.ADMIN]), MessageController.updateMessage)
router.delete("/remove/:messageId", can([PERMISSIONS.ADMIN]), MessageController.deleteMessage)

module.exports = {
    MessageRoutes: router
}