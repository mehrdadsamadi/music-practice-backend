const createHttpError = require('http-errors');
const {StatusCodes} = require('http-status-codes');

const { TimeGoalModel } = require("../../models/timeGoal.model");
const Controller = require("../controller");

class timeGoalController extends Controller {
    async getAllUserTimeGoal(req, res, next) {
        try {
            const timeGoals = await TimeGoalModel.find({users: req.user._id}).populate([{path: "users", select:"-otp"}])

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    timeGoals
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async getAllTimeGoal(req, res, next) {
        try {
            const timeGoals = await TimeGoalModel.find({}).populate([{path: "users", select:"-otp"}])

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    timeGoals
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneTimeGoal(req, res, next) {
        try {
            const {timeGoalId} = req.params
            const timeGoal = await this.findTimeGoal(timeGoalId)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    timeGoal
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createTimeGoal(req, res, next) {
        try {
            await TimeGoalModel.create(req.body)
            
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "هدف زمانی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateTimeGoal(req, res, next) {
        try {
            const {timeGoalId} = req.params

            const timeGoal = await this.findTimeGoal(timeGoalId)
            if(!timeGoal) throw createHttpError.NotFound("هدف زمانی با این آیدی یافت نشد")

            const data = JSON.parse(JSON.stringify(req.body))

            const result = await TimeGoalModel.updateOne({_id: timeGoalId}, {
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش هدف زمانی ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش هدف زمانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteTimeGoal(req, res, next) {
        try {
            const {timeGoalId} = req.params
            await this.findTimeGoal(timeGoalId)

            const result = await TimeGoalModel.deleteOne({_id: timeGoalId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف هدف زمانی ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف هدف زمانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findTimeGoal(timeGoalId) {
        const timeGoal = await TimeGoalModel.findOne({_id: timeGoalId})
        if(!timeGoal) throw createHttpError.NotFound("هدف زمانی یافت نشد")
        return timeGoal
    }
}

module.exports = {
    timeGoalController: new timeGoalController()
}