const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const {GiftModel} = require("../../models/gift.model");
const { UserModel } = require("../../models/user.model");
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
    
    async getOneGift(req, res, next) {
        try {
            const {giftId} = req.params

            const gift = await GiftModel.findOne({_id: giftId})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    gift
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createGift(req, res, next) {
        try {

            await GiftModel.create(req.body)

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

    async receiveGift(req, res, next) {
        try {
            const {userId, giftId, status} = req.params
            
            const result = await UserModel.updateOne({_id: userId, "purchase_gifts.gift": giftId}, {
                $set: {
                    "purchase_gifts.$.is_receive": (status === "true")
                }
            })

            if(!result.modifiedCount) throw createHttpError.InternalServerError("تغییر دریافت هدیه ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "تغییر دریافت هدیه با موفقیت انجام شد"
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