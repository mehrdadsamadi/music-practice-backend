const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find({})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async getOneUser(req, res, next) {
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

    async updateUser(req, res, next) {
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
}

module.exports = {
    UserController: new UserController()
}