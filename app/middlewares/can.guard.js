const createHttpError = require("http-errors")
const { RoleModel } = require("../models/role.model")
const { PERMISSIONS } = require("../utils/constants")

function can(permissions = []) {
    return async function(req, res, next) {
        try {
            if(!permissions.length) return next()
            if(permissions.includes(PERMISSIONS.ADMIN)) return next()

            const user = req.user
            const role = await RoleModel.findOne({title: user.role}).populate("permissions")
            const userPermissions = role.permissions.map(item => item.name)

            const hasPermission = permissions.every(permission => {
                return userPermissions.includes(permission)
            })

            if(hasPermission) return next()
            throw createHttpError.Forbidden("شما دسترسی لازم برای این بخش را ندارید")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    can
}