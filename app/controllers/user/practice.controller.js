const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class PracticeController extends Controller {
    async getAllPractices(req, res, next) {
        try {
            const {userId} = req.params

            const practices = await UserModel.findOne({_id: userId}, "practices")
            if(!practices) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    practices: practices.practices
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async getOnePractice(req, res, next) {
        try {
            const {practiceId} = req.params

            const {practices} = await UserModel.findOne({"practices._id": practiceId}, "practices.$")
            if(!practices) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    practice: practices[0]
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addPractice(req, res, next) {
        try {
            const {userId} = req.params
            
            const result = await UserModel.updateOne({_id: userId}, {
                $push: {
                    practices: req.body
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ثبت تمرین ناموفق بود")

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "ثبت تمرین با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updatePractice(req, res, next) {
        try {
            const {practiceId} = req.params

            const data = JSON.parse(JSON.stringify(req.body))
            
            const result = await UserModel.updateOne({"practices._id" : practiceId}, {
                $set: {
                    "practices.$.time": data?.time
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش تمرین ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش تمرین موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deletePractice(req, res, next) {
        try {
            const {practiceId} = req.params

            const result = await UserModel.updateOne({"practices._id": practiceId}, {
                $pull: {
                    practices: {
                        _id: practiceId
                    }
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("حذف تمرین ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حدف تمرین موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PracticeController: new PracticeController()
}