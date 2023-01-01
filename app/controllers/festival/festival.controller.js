const createHttpError = require('http-errors');
const {StatusCodes} = require('http-status-codes');

const { FestivalModel } = require("../../models/festival.model");
const { GiftModel } = require('../../models/gift.model');
const { UserModel } = require('../../models/user.model');
const Controller = require("../controller");

class FestivalController extends Controller {
    async getAllFestivals(req, res, next) {
        try {
            const festivals = await FestivalModel.find({}, "-users.otp").populate([{path: "gifts"}, {path: "users.user", select:"-otp"}])

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
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).slice(0, 10);

            const festival = await FestivalModel.findOne({
                $and: [
                    {start_in: {$lte: localISOTime}},
                    {end_in: {$gte: localISOTime}},
                ]
            }).populate([{path: "gifts"}, {path: "users.user", select:"-otp"}])
            
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

    async givingGifts(req, res, next) {
        try {
            const {festivalId} = req.params

            const festival = await this.findFestival(festivalId)
            if(!festival) throw createHttpError.BadRequest("جشنواره ای با این آیدی یافت نشد")
            if(festival.given_gifts) throw createHttpError.BadRequest("هدایای این جشنواره قبلا اهدا شده است")

            const ranking = await this.getRanking(festivalId)
            
            let errors = []

            for (const giftId of festival.gifts) {

                const targetGift = await GiftModel.findOne({_id: giftId})
                if(!targetGift) errors.push(`هدیه ای با آیدی ${giftId} یافت نشد`)

                const targetUser = ranking[targetGift.rank - 1]
                if(!targetUser) continue

                const fullname = `${targetUser.first_name + " " + targetUser.last_name}`

                const existGift = await UserModel.findOne({_id: targetUser.id, "purchase_gifts.gift": giftId})
                if(existGift) errors.push(`${fullname} ${targetGift.name} را قبلا دریافت کرده است`)

                if(targetUser.score >= targetGift.min_score) {
                    const result = await UserModel.updateOne({_id: targetUser.id}, {
                        $push: {
                            purchase_gifts: {gift: giftId, is_receive: false}
                        }
                    })
                    if(!result.modifiedCount) errors.push(`خطای سرور! ${targetGift.name} به ${fullname} اهدا نشد`)
                } else {
                    errors.push(`امتیاز ${fullname} به حداقل امتیاز ${targetGift.name} نرسیده است`)
                }
            }

            const result = await FestivalModel.updateOne({_id: festivalId}, {
                $set: {
                    given_gifts: true
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش جشنواره ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "اهدا هدایا با موفقیت انجام شد",
                    errors
                }
            })


        } catch (error) {
            next(error)
        }
    }

    async getFestivalRanking(req, res, next) {
        try {
            const {festivalId} = req.params

            const ranking = await this.getRanking(festivalId)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    ranking
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async getRanking(festivalId) {
        const festival = await this.findFestival(festivalId)
            
        let ranking = []
        
        for (const user of festival.users) {
            const userInfo = await UserModel.findOne({_id: user.user}).populate([{path: "instrument"}])
            const {practices} = userInfo

            const enterUserDate = new Date(user.createdAt)
            const endCurrentDay = new Date();
            endCurrentDay.setHours(23, 59, 59, 999);
            
            const userFestivalPractice = this.getTimePractices(practices, enterUserDate, endCurrentDay)
            const totalUserFestivalPractice = this.getTotalPracticeTime(userFestivalPractice)
            
            ranking.push({
                id: userInfo._id,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                instrument: userInfo.instrument.name,
                score: totalUserFestivalPractice
            })
        }

        const sortedRanking = ranking.sort((a, b) => a.score - b.score)

        return sortedRanking.reverse()
    }

    getTimePractices(practices, start, end) {
        return practices.filter(pr => {
            const prDay = new Date(pr.createdAt)
            if(prDay.getTime() >= start.getTime() && prDay.getTime() <= end.getTime()) {
                return pr
            }
        })
    }

    getTotalPracticeTime(timePractices) {
        let totalPracticeTime = 0
        timePractices.forEach(tp => {
            totalPracticeTime += +tp.time
        })

        return totalPracticeTime
    }

    async addUserToFestival(req, res, next) {
        try {
            const {festivalId} = req.params

            const festival = await this.findFestival(festivalId)
            if(!festival) throw createHttpError.NotFound("جشنواره ای با این آیدی یافت نشد")
            
            const existUser = festival.users.filter(user => user.user.equals(req.user._id))
            if(existUser.length) throw createHttpError.BadRequest("شما قبلا در این جشنواره شرکت کرده اید")

            const result = await FestivalModel.updateOne({_id: festivalId}, {
                $push: {
                    users: {user: req.user._id}
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
                    message: "جشنواره با موفقیت ایجاد شد"
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
            if(!festival) throw createHttpError.NotFound("جشنواره ای با این آیدی یافت نشد")

            const data = JSON.parse(JSON.stringify(req.body))

            const result = await FestivalModel.updateOne({_id: festivalId}, {
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش جشنواره ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش جشنواره با موفقیت انجام شد"
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
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف جشنواره ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف جشنواره با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findFestival(festivalId) {
        const festival = await FestivalModel.findOne({_id: festivalId})
        if(!festival) throw createHttpError.NotFound("جشنواره یافت نشد")
        return festival
    }
}

module.exports = {
    FestivalController: new FestivalController()
}