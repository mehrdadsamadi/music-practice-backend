const { MessageController } = require('../../controllers/user/message.controller');

const router = require('express').Router();

router.get("/get-all/:userId", MessageController.getAllMessages)
router.get("/get/:messageId", MessageController.getOneMessage)
router.patch("/add/:userId", MessageController.addMessage)
router.patch("/update/:messageId", MessageController.updateMessage)
router.delete("/remove/:messageId", MessageController.deleteMessage)

module.exports = {
    MessageRoutes: router
}