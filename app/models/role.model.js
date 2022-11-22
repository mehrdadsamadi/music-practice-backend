const {Schema, model, Types} = require('mongoose');

const roleSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, default: "", },
    permissions: [{type: Types.ObjectId, ref: "permission"}]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    RoleModel: model("role",roleSchema)
}