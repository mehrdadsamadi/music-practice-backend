const {Schema, model} = require('mongoose');

const giftSchema = new Schema({
    name: {type: String, required: true},
    min_score: {type: String, required: true},
    in_festival: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    GiftModel: model("gift",giftSchema)
}