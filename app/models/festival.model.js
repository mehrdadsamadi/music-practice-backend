const {Schema, model, Types} = require('mongoose');

const festivalSchema = new Schema({
    name: {type: String, required: true},
    start_in: {type: String, required: true},
    end_in: {type: String, required: true},
    gifts: {type: [Types.ObjectId], ref: "gift", default: []},
    users: {type: [Types.ObjectId], ref: "user", default: []},
})

module.exports = {
    festivalModel: model("instrument",festivalSchema)
}