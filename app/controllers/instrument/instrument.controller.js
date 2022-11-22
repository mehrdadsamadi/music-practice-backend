const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const { InstrumentModel } = require("../../models/intrument.model");
const Controller = require("../controller");

class InstrumentController extends Controller {
    async getAllInstruments(req, res, next) {
        try {
            const instruments = await InstrumentModel.find({}, {__v: 0})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                instruments
            })
        } catch (error) {
            next(error)
        }
    }

    async addInstrument(req, res, next) {
        try {
            const {name} = req.body

            const isExist = await InstrumentModel.findOne({name})
            if(isExist) throw createHttpError.BadRequest("این ساز قبلا اضافه شده است")

            await InstrumentModel.create({name})

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "ساز با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteInstrument(req, res, next) {
        try {
            const {instrumentId} = req.params

            const instrument = await InstrumentModel.findOne({_id: instrumentId})
            if(!instrument) throw createHttpError.NotFound("سازی با این آیدی یافت نشد")

            const result = await InstrumentModel.deleteOne({_id: instrumentId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف ساز ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف ساز موفقیت آمیز بود"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    InstrumentController: new InstrumentController()
}