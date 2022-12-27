const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { TimeGoalModel } = require("../../models/timeGoal.model");
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class PracticeController extends Controller {
    async getAllPractices(req, res, next) {
        try {
            // day
            const startCurrentDay = new Date();
            startCurrentDay.setHours(0, 0, 0, 0);
            
            const endCurrentDay = new Date();
            endCurrentDay.setHours(23, 59, 59, 999);

            // week
            let curr = new Date;
            let first = (curr.getDate() - curr.getDay()); 
            let last = first + 6;

            let firstday = new Date(curr.setDate(first)).toUTCString();
            let lastday = new Date(curr.setDate(last)).toUTCString();

            const startCurrentWeek = new Date(firstday)
            startCurrentWeek.setHours(0, 0, 0, 0);

            const endCurrentWeek = new Date(lastday)
            endCurrentWeek.setHours(23, 59, 59, 999);

            const practices = await UserModel.findOne({_id: req.user._id}, "practices")
            if(!practices) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            const todayPractices = await this.getTimePractices(practices.practices, startCurrentDay, endCurrentDay)
            const todayTotalPracticeTime = this.getTotalPracticeTime(todayPractices)
            
            const currentWeekPractices = await this.getTimePractices(practices.practices, startCurrentWeek, endCurrentWeek)
            const currentWeekTotalPracticeTime = this.getTotalPracticeTime(currentWeekPractices)
            

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    practices: practices.practices,
                    totalPractice: {
                        day: todayTotalPracticeTime,
                        week: currentWeekTotalPracticeTime
                    }
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
            const {_id} = req.user

            const result = await UserModel.updateOne({_id}, {
                $push: {
                    practices: req.body
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ثبت تمرین ناموفق بود")

            const userPractices = await UserModel.find({_id},{practices: 1})
            const {practices} = userPractices[0]
            
            let score = 0
            // daily practice
            score += await this.checkDailyPractice(practices, _id)

            // weekly practice
            score += await this.checkWeeklyPractice(practices, _id)

            if(score != 0) {
                const scoreResult = await UserModel.updateOne({_id}, {
                    $push: {
                        scores: {score, description: "امتیاز بدست آمده از رسیدن به اهداف زمانی"}
                    },
                    $inc: {
                        available_score: +score
                    }
                })
                if(!scoreResult.modifiedCount) throw createHttpError.InternalServerError("اضافه کردن امتیاز ناموفق بود")
            }

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "ثبت تمرین با موفقیت انجام شد",
                    score
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

    async checkDailyPractice(practices, userId) {
        const startCurrentDay = new Date();
        startCurrentDay.setHours(0, 0, 0, 0);
        
        const endCurrentDay = new Date();
        endCurrentDay.setHours(23, 59, 59, 999);
        
        const todayPractices = this.getTimePractices(practices, startCurrentDay, endCurrentDay)
        
        const totalPracticeTime = this.getTotalPracticeTime(todayPractices)

        const timeGoals = await TimeGoalModel.find({"users" : userId, period: "daily"})

        return this.setScore(timeGoals, totalPracticeTime, todayPractices)
    }

    async checkWeeklyPractice(practices, userId) {
        
        let curr = new Date; // get current date
        let first = (curr.getDate() - curr.getDay()); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6

        let firstday = new Date(curr.setDate(first)).toUTCString();
        let lastday = new Date(curr.setDate(last)).toUTCString();

        const startCurrentWeek = new Date(firstday)
        startCurrentWeek.setHours(0, 0, 0, 0);

        const endCurrentWeek = new Date(lastday)
        endCurrentWeek.setHours(23, 59, 59, 999);

        const currentWeekPractices = this.getTimePractices(practices, startCurrentWeek, endCurrentWeek)
        
        const totalPracticeTime = this.getTotalPracticeTime(currentWeekPractices)

        const timeGoals = await TimeGoalModel.find({"users" : userId, period: "weekly"})

        return this.setScore(timeGoals, totalPracticeTime, currentWeekPractices)
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

    setScore(timeGoals, totalPracticeTime, timePractices) {
        let score = 0
        timeGoals.forEach(tg => {
            if(totalPracticeTime >= tg.time && (totalPracticeTime - timePractices[timePractices.length - 1].time) < tg.time) score += +tg.score
        })
        
        return score
    }
}

module.exports = {
    PracticeController: new PracticeController()
}