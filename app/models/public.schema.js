const {Schema, Types} = require('mongoose');

const scoreSchema = new Schema({
    score: {type: String, required: true},
    description: {type: String, default: ""},
}, {
    versionKey: false,
    timestamps: true
})

const messageSchema = new Schema({
    message: {type: String, default: ""},
    seen: {type: Boolean, default: false}
}, {
    versionKey: false,
    timestamps: true
})

const practiceSchema = new Schema({
    time: {type: String, default: "0"}
}, {
    versionKey: false,
    timestamps: true
})

const festivalUserSchema = new Schema({
    user: {type: Types.ObjectId, ref: "user"}
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    scoreSchema,
    messageSchema,
    practiceSchema,
    festivalUserSchema
}