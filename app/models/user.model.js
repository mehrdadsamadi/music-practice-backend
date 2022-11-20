const {Schema, model, Types} = require('mongoose');
const { scoreSchema, messageSchema, practiceSchema } = require('./public.schema');

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    mobile: {type: String, required: true},
    instrument: {type: Types.ObjectId, ref: "instrument", required: true},
    score: {type: [scoreSchema], default: []},
    message: {type: [messageSchema], default: []},
    practice: {type: [practiceSchema], default: []},
    role: {type: String, default: "USER"}
}, {
    timestamps: true,
})

module.exports = {
    UserModel: model("user", userSchema) 
}