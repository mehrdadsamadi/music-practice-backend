const kavenegar = require('kavenegar');
const createHttpError = require("http-errors");
const {StatusCodes} = require('http-status-codes');

const { UserModel } = require("../../models/user.model");
const { ROLES } = require("../../utils/constants");
const { generateRandomNumber, signAccessToken } = require("../../utils/function");
const { getOtpValidteSchema, checkOtpValidateSchema } = require("../../validators/auth/auth.validator.schema");
const Controller = require("../controller");

class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpValidteSchema.validate(req.body)

            const {mobile} = req.body
            const code = generateRandomNumber()

            const saveUserResult = this.saveUser(mobile, code)
            if(!saveUserResult) throw createHttpError.Unauthorized("ورود شما ناموفق بود")

            const sendMessage = `
                << اپلیکیشن تمرین موسیقی >>
کد ورود شما: ${code}
            `
            const practicePhone = kavenegar.KavenegarApi({apikey: process.env.KAVENEGAR_API_KEY})
            practicePhone.Send({ message: sendMessage.trim() , sender: "1000596446" , receptor: mobile });
            
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                    code,
                    mobile
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req, res, next) {
        try {
            await checkOtpValidateSchema.validate(req.body)

            const {mobile, code} = req.body
            const user = await UserModel.findOne({mobile})
            if(!user) throw createHttpError.NotFound("کاربری با این شماره تلفن یافت نشد")

            if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمیباشد")

            const now = new Date().getTime()
            if(+user.otp.expiresIn < +now) throw createHttpError.Unauthorized("کد شما منقضی شده است، کد جدید دریافت کنید")

            const accessToken = await signAccessToken(user._id)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    accessToken,
                    messsage: "ورود شما موفقیت آمیز بود"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000) // 2m
        }
        
        const existUserResult = await this.checkExistUser(mobile)
        
        if(existUserResult) {
            return (await this.updateUserOtp(mobile, otp))
        }

        return !!(await UserModel.create({mobile, otp, role: ROLES.USER}))
    }

    async checkExistUser(mobile) {
        const user = await UserModel.findOne({mobile})
        return !!user
    }

    async updateUserOtp(mobile, otp) {
        const result = await UserModel.updateOne({mobile}, {$set: {otp}})
        return !!result.modifiedCount
    }
}

module.exports = {
    AuthController: new AuthController()
}