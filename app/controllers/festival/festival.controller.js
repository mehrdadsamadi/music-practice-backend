const createHttpError = require('http-errors');
const {StatusCodes} = require('http-status-codes');

const { FestivalModel } = require("../../models/festival.model");
const { UserModel } = require('../../models/user.model');
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

    async getFestivalRanking(req, res, next) {
        try {
            const {festivalId} = req.params

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
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    instrument: userInfo.instrument.name,
                    score: totalUserFestivalPractice
                })
            }

            const sortedRanking = ranking.sort((a, b) => a.score - b.score)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    ranking: sortedRanking.reverse()
                }
            })

        } catch (error) {
            next(error)
        }
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
            if(!festival) throw createHttpError.NotFound("فستیوالی با این آیدی یافت نشد")
            
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