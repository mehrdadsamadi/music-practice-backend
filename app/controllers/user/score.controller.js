const createHttpError = require("http-errors")
const {StatusCodes} = require('http-status-codes');
const { UserModel } = require("../../models/user.model");
const Controller = require("../controller");

class ScoreController extends Controller {
    async getAllUsersScore(req, res, next) {
        try {

            const users = await UserModel.find({role: {$ne: "ADMIN"}}, {scores: 1, first_name: 1, last_name: 1, instrument: 1, role: 1})
            // if(!users) throw createHttpError.NotFound("کاربری با این آیدی یافت نشد")

            let curr = new Date;
            let first = (curr.getDate() - curr.getDay()); 
            let last = first + 6;

            let firstday = new Date(curr.setDate(first)).toUTCString();
            let lastday = new Date(curr.setDate(last)).toUTCString();

            const startCurrentWeek = new Date(firstday)
            startCurrentWeek.setHours(0, 0, 0, 0);

            const endCurrentWeek = new Date(lastday)
            endCurrentWeek.setHours(23, 59, 59, 999);

            let editedUsers = []
            await users.forEach(async us => {
                const userscores = await this.getTimeScores(us.scores, startCurrentWeek, endCurrentWeek) //scores:[]
                editedUsers.push({...JSON.parse(JSON.stringify(us)), scores: userscores})
            })

            let newUsers = []
            editedUsers.forEach(user => {
                let sum = 0
                user.scores.forEach(score => sum += +score.score)
        
                newUsers.push({...JSON.parse(JSON.stringify(user)), score: sum})
            })

            newUsers.sort(function(a, b){return +b.score - +a.score})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    users: newUsers
                }
            })
        } catch (error) {
            next(error)
        }
    }

    getTimeScores(scores, start, end) {
        return scores.filter(pr => {
            const prDay = new Date(pr.createdAt)
            if(prDay.getTime() >= start.getTime() && prDay.getTime() <= end.getTime()) {
                return pr
            }
        })
    }

    async getAllScores(req, res, next) {
        try {

            const scores = await UserModel.findOne({_id: req.user._id}, "scores")
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