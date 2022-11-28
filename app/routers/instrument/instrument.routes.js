const { InstrumentController } = require('../../controllers/instrument/instrument.controller');
const { can } = require('../../middlewares/can.guard');
const { verifyAccessToken } = require('../../middlewares/verifyAccessToken');
const { PERMISSIONS } = require('../../utils/constants');

const router = require('express').Router();

router.get("/get-all", InstrumentController.getAllInstruments)
router.post("/add", verifyAccessToken, can([PERMISSIONS.ADMIN]), InstrumentController.addInstrument)
router.delete("/remove/:instrumentId", verifyAccessToken, can([PERMISSIONS.ADMIN]), InstrumentController.deleteInstrument)

module.exports = {
    InstrumentRoutes: router
}