const { InstrumentController } = require('../../controllers/instrument/instrument.controller');

const router = require('express').Router();

router.get("/get-all", InstrumentController.getAllInstruments)
router.post("/add", InstrumentController.addInstrument)
router.delete("/remove/:instrumentId", InstrumentController.deleteInstrument)

module.exports = {
    InstrumentRoutes: router
}