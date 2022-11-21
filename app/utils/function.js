const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');

const { UserModel } = require("../models/user.model");

function generateRandomNumber() {
    return Math.floor((Math.random() * 9000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)

        const payload = {
            mobile: user.mobile
        }
        const options = {
            expiresIn: "7d"
        }

        JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور، بار دیگر تکرار کنید"))
            resolve(token)
        })
    })
}

module.exports = {
    generateRandomNumber,
    signAccessToken
}