const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class ScoreController extends Controller {
    async getAllScores(req, res, next) {
        try {
            const {userId} = req.params

            const scores = await UserModel.findOne({_id: userId}, "scores")
            if(!scores) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    scores: scores.scores
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneScore(req, res, next) {
        try {
            const {scoreId} = req.params

            const {scores} = await UserModel.findOne({"scores._id": scoreId}, "scores.$")
            if(!scores) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    score: scores[0]
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addScore(req, res, next) {
        try {
            const {userId} = req.params
            
            const result = await UserModel.updateOne({_id: userId}, {
                $push: {
                    scores: req.body
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("اضافه کردن امتیاز ناموفق بود")

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "ثبت امتیاز با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateScore(req, res, next) {
        try {
            const {scoreId} = req.params

            const data = JSON.parse(JSON.stringify(req.body))
            
            const result = await UserModel.updateOne({"scores._id" : scoreId}, {
                $set: {
                    "scores.$.score": data?.score,
                    "scores.$.description": data?.description
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش امتیاز ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش امتیاز موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteScore(req, res, next) {
        try {
            const {scoreId} = req.params

            const result = await UserModel.updateOne({"scores._id": scoreId}, {
                $pull: {
                    scores: {
                        _id: scoreId
                    }
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("حذف امتیاز ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حدف امتیاز موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ScoreController: new ScoreController()
}