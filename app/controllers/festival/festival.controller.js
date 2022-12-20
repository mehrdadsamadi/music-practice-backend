const createHttpError = require('http-errors');
const {StatusCodes} = require('http-status-codes');

const { FestivalModel } = require("../../models/festival.model");
const Controller = require("../controller");

class FestivalController extends Controller {
    async getAllFestivals(req, res, next) {
        try {
            const festivals = await FestivalModel.find({}, "-users.otp").populate([{path: "gifts"}, {path: "users", select:"-otp"}])

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    festivals
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneFestival(req, res, next) {
        try {
            const {festivalId} = req.params
            const festival = await this.findFestival(festivalId)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    festival
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getActiveFestival(req, res, next) {
        try {
            const currentDate = new Date().toISOString().slice(0, 10)

            const festival = await FestivalModel.find({
                $and: [
                    {start_in: {$lte: currentDate}},
                    {end_in: {$gte: currentDate}},
                ]
            })
            
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    festival: festival[0]
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addUserToFestival(req, res, next) {
        try {
            const {festivalId} = req.params

            const festival = await this.findFestival(festivalId)
            if(!festival) throw createHttpError.NotFound("فستیوالی با این آیدی یافت نشد")
            
            const existUser = festival.users.filter(user => user._id.equals(req.user._id))
            if(existUser.length) throw createHttpError.BadRequest("شما قبلا در این جشنواره شرکت کرده اید")

            const result = await FestivalModel.updateOne({_id: festivalId}, {
                $push: {
                    users: req.user._id
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("شرکت در جشنواره ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "شما با موفقیت وارد جشنواره شدید"
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async createFestival(req, res, next) {
        try {
            await FestivalModel.create(req.body)
            
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "فستیوال با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateFestival(req, res, next) {
        try {
            const {festivalId} = req.params

            const festival = await this.findFestival(festivalId)
            if(!festival) throw createHttpError.NotFound("فستیوالی با این آیدی یافت نشد")

            const data = JSON.parse(JSON.stringify(req.body))

            const result = await FestivalModel.updateOne({_id: festivalId}, {
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش فستیوال ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش فستیوال با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteFestival(req, res, next) {
        try {
            const {festivalId} = req.params
            await this.findFestival(festivalId)

            const result = await FestivalModel.deleteOne({_id: festivalId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف فستیوال ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف فستیوال با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findFestival(festivalId) {
        const festival = await FestivalModel.findOne({_id: festivalId})
        if(!festival) throw createHttpError.NotFound("فستیوال یافت نشد")
        return festival
    }
}

module.exports = {
    FestivalController: new FestivalController()
}