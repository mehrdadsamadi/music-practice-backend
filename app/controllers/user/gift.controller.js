const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { GiftModel } = require("../../models/gift.model");
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class GiftController extends Controller {
    async getAllUserGifts(req, res, next) {
        try {
            const {purchase_gifts} = await UserModel.findOne({_id: req.user._id}, {purchase_gifts: 1}).populate([{path: "purchase_gifts"}])
            
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    purchase_gifts
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async buyGift(req, res, next) {
        try {
            const {giftId} = req.params

            const gift = await GiftModel.findOne({_id: giftId})
            if(!gift) throw createHttpError.NotFound("هدیه ای با این آیدی یافت نشد")

            if(gift.in_festival) throw createHttpError.BadRequest("هدیه های جشنواره را نمیتوانید خریداری کنید")

            const existGift = await UserModel.findOne({_id: req.user._id, purchase_gifts: giftId})
            if(existGift) throw createHttpError.BadRequest("شما این هدیه را قبلا خریداری کرده اید")

            if(req.user.available_score < gift.min_score) throw createHttpError.BadRequest("امتیاز شما برای خرید این هدفه کافی نیست")

            const result = await UserModel.updateOne({_id: req.user._id}, {
                $push: {
                    purchase_gifts: giftId
                },
                $inc: {
                    available_score: -(+gift.min_score)
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("هدیه خریداری نشد")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "خرید هدیه با موفقیت انجام شد",
                    score: req.user.available_score - gift.min_score
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