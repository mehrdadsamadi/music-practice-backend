const {Schema, model} = require('mongoose');

const permissionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, default: ""}
}, {
    versionKey: false
})

module.exports = {
    PermissionModel: model("permission",permissionSchema)
}