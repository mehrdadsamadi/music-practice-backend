const kavenegar = require('kavenegar');
const createHttpError = require("http-errors");
const bcrypt = require('bcrypt');
const {StatusCodes} = require('http-status-codes');

const { UserModel } = require("../../models/user.model");
const { ROLES } = require("../../utils/constants");
const { generateRandomNumber, signAccessToken } = require("../../utils/function");
const { getOtpValidteSchema, checkOtpValidateSchema, passwordValidateSchema, loginValidateSchema } = require("../../validators/auth/auth.validator.schema");
const Controller = require("../controller");

class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpValidteSchema.validate(req.body)

            const {mobile, resend} = req.body

            if(resend)
                await UserModel.deleteOne({mobile})

            const user = await UserModel.findOne({mobile})
            if(user) throw createHttpError.BadRequest("این شماره موبایل قبلا ثبت نام شده است")

            const code = generateRandomNumber()

            const saveUserResult = this.saveUser(mobile, code)
            if(!saveUserResult) throw createHttpError.Unauthorized("ورود شما ناموفق بود")

            const sendMessage = 
`
کد ورود شما: ${code}
 << اپلیکیشن تمرین موسیقی >>
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
            const user = await UserModel.findOne({mobile}, {password: 0})
            if(!user) throw createHttpError.NotFound("کاربری با این شماره تلفن یافت نشد")

            if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمیباشد")

            const now = new Date().getTime()
            if(+user.otp.expiresIn < +now) throw createHttpError.Unauthorized("کد شما منقضی شده است، کد جدید دریافت کنید")

            const accessToken = await signAccessToken(user._id)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    accessToken,
                    user,
                    message: "ثبت نام شما موفقیت آمیز بود، حال کلمه عبوری برای خود ایجاد کنید"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async setPassword(req,res, next) {
        try {
            await passwordValidateSchema.validate(req.body)

            const {password} = req.body

            if(!req.user) throw createHttpError.Unauthorized("ابتدا ثبت نام کنید سپس وارد شوید")

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    const result = await UserModel.updateOne({mobile: req.user.mobile}, {
                        $set: {
                            password: hash
                        }
                    })

                    if(!result.modifiedCount) throw createHttpError.InternalServerError("ذخیره کلمه عبور ناموفق بود")
                });
            });

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "کلمه عبور شما با موفقیت ذخیره شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async setUserInfo(req, res, next) {
        try {
            const {first_name, last_name, instrument} = req.body

            const result = await UserModel.updateOne({mobile: req.user.mobile}, {
                $set: {
                    first_name,
                    last_name,
                    instrument
                }
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ثبت اطلاعات کاربر ناموفق بود") 

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    user: req.user,
                    message: "ثبت اطلاعات کاربر با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async loginWithPassword(req, res, next) {
        try {
            await loginValidateSchema.validate(req.body)

            const {mobile, password} = req.body

            const user = await UserModel.findOne({mobile})
            if(!user) throw createHttpError.BadRequest("شماره موبایل یا کلمه عبور اشتباه است")

            const compareResult = await bcrypt.compareSync(password, user.password);

            if(!compareResult) throw createHttpError.BadRequest("شماره موبایل یا کلمه عبور اشتباه است")

            const accessToken = await signAccessToken(user._id)
    
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    accessToken,
                    user,
                    message: "ورود شما موفقیت آمیز بود"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    
    async getLoginUser(req, res, next) {
        try {
            if(!req.user) throw createHttpError.Unauthorized("کاربری لاگین نکرده است")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    user: req.user
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