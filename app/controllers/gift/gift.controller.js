const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const {GiftModel} = require("../../models/gift.model");
const Controller = require("../controller");

class GiftController extends Controller {
    async getAllGifts(req, res, next) {
        try {
            const gifts = await GiftModel.find({})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    gifts
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createGift(req, res, next) {
        try {
            const {name, min_score, in_festival} = req.body

            await GiftModel.create({name, min_score, in_festival})

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "هدیه با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateGift(req, res, next) {
        try {
            const {giftId} = req.params
    
            const gift = await GiftModel.findOne({_id: giftId})
            if(!gift) throw createHttpError.NotFound("هدیه ای با این آیدی یافت نشد")
    
            const data = JSON.parse(JSON.stringify(req.body))
            
            const result = await GiftModel.updateOne({_id: giftId}, {
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش هدیه ناموفق بود")
    
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "هدیه مورد نظر با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeGift(req, res, next) {
        try {
            const {giftId} = req.params

            const gift = await GiftModel.findOne({_id: giftId})
            if(!gift) throw createHttpError.NotFound("هدیه ای با این آیدی یافت نشد")

            const result = await GiftModel.deleteOne({_id: giftId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("هدیه پاک نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "هدیه مورد نظر با موفقیت پاک شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    GiftController: new GiftController()
}