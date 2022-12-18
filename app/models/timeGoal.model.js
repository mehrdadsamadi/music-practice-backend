const {Schema, model, Types} = require('mongoose');

const timeGoalSchema = new Schema({
    time: {type: String, required: true},
    score: {type: String, required: true},
    period: {type: String, enum: ['daily', 'weekly'], default: 'weekly'},
    users: {type: [Types.ObjectId], ref: "user", default: []},
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    TimeGoalModel: model("timeGoal",timeGoalSchema)
}