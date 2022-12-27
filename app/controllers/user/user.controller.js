const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find({}).populate([{path: "instrument"}, {path: "purchase_gifts"}])

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

    async deleteUser(req, res, next) {
        try {
            const {userId} = req.params

            const result = await UserModel.deleteOne({_id: userId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف کاربر ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف کاربر با موفقیت انجام شد"
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