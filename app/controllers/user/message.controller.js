const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class MessageController extends Controller {
    async getAllMessages(req, res, next) {
        try {
            const {userId} = req.params

            const messages = await UserModel.findOne({_id: userId}, "messages")
            if(!messages) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    messages: messages.messages
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async getOneMessage(req, res, next) {
        try {
            const {messageId} = req.params

            const {messages} = await UserModel.findOne({"messages._id": messageId}, "messages.$")
            if(!messages) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: messages[0]
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addMessage(req, res, next) {
        try {
            const {userId} = req.params
            
            const result = await UserModel.updateOne({_id: userId}, {
                $push: {
                    messages: req.body
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ثبت پیام ناموفق بود")

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "ثبت پیام با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateMessage(req, res, next) {
        try {
            const {messageId} = req.params

            const data = JSON.parse(JSON.stringify(req.body))
            
            const result = await UserModel.updateOne({"messages._id" : messageId}, {
                $set: {
                    "messages.$.message": data?.message
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش پیام ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش پیام موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const {messageId} = req.params

            const result = await UserModel.updateOne({"messages._id": messageId}, {
                $pull: {
                    messages: {
                        _id: messageId
                    }
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("حذف پیام ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حدف پیام موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    MessageController: new MessageController()
}