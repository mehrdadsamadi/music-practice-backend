const { InstrumentController } = require('../../controllers/instrument/instrument.controller');

const router = require('express').Router();

router.get("/get-all", InstrumentController.getInstruments)
router.post("/add", InstrumentController.addInstrument)

module.exports = {
    InstrumentRoutes: router
}