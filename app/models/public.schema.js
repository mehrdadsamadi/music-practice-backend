const {Schema} = require('mongoose');

const scoreSchema = new Schema({
    score: {type: String, required: true},
    description: {type: String, default: ""},
}, {
    timestamps: true
})

const messageSchema = new Schema({
    message: {type: String, default: ""},
}, {
    timestamps: true
})

const practiceSchema = new Schema({
    time: {type: String, default: "0"}
}, {
    timestamps: true
})

module.exports = {
    scoreSchema,
    messageSchema,
    practiceSchema,
}