const {Schema, model} = require('mongoose');

const giftSchema = new Schema({
    name: {type: String, required: true},
    min_score: {type: String, required: true},
    in_festival: {type: Boolean, default: false}
})

module.exports = {
    giftModel: model("gift",giftSchema)
}