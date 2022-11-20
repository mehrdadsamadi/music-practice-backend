const {Schema, model} = require('mongoose');

const instrumentSchema = new Schema({
    name: {type: String, required: true},
})

module.exports = {
    InstrumentModel: model("instrument",instrumentSchema)
}