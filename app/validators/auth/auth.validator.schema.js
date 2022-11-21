const yup = require('yup');

const getOtpValidteSchema = yup.object({
    mobile: yup.string().required("لطفا شماره موبایل خود را وارد کنید").length(11, "شماره موبایل معتبر نمیباشد").matches(/^09[0-9]{9}$/, "شماره موبایل وارد شده صحیح نمیباشد")
})

const checkOtpValidateSchema = yup.object({
    mobile: yup.string().required("لطفا شماره موبایل خود را وارد کنید").length(11).matches(/^09[0-9]{9}$/, "شماره موبایل وارد شده صحیح نمیباشد"),
    code: yup.string().required("لطفا کد ارسالی را وارد کنید").min(4, "کد ارسالی نباید کمتر از 4 رقم باشد").max(6, "کد ارسالی نباید بیشتر از 6 رقم باشد")
})

module.exports = {
    getOtpValidteSchema,
    checkOtpValidateSchema
}