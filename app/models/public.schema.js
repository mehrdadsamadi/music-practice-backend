const {Schema} = require('mongoose');

const scoreSchema = new Schema({
    score: {type: String, required: true},
    description: {type: String, default: ""},
}, {
    versionKey: false,
    timestamps: true
})

const messageSchema = new Schema({
    message: {type: String, default: ""},
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

module.exports = {
    scoreSchema,
    messageSchema,
    practiceSchema,
}