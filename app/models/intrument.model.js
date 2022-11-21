const {Schema, model} = require('mongoose');

const instrumentSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {
    versionKey: false
})

module.exports = {
    InstrumentModel: model("instrument",instrumentSchema)
}