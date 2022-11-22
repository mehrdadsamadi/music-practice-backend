const {Schema, model, Types} = require('mongoose');
const { scoreSchema, messageSchema, practiceSchema } = require('./public.schema');

const userSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    instrument: {type: Types.ObjectId, ref: "instrument"},
    scores: {type: [scoreSchema], default: []},
    messages: {type: [messageSchema], default: []},
    practices: {type: [practiceSchema], default: []},
    mobile: {type: String, required: true},
    password: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    role: {type: String, default: "USER"}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    UserModel: model("user", userSchema) 
}