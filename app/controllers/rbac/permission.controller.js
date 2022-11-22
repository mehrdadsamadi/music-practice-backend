const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const { mongoose } = require("mongoose");
const { PermissionModel } = require("../../models/permission.model");
const { addPermissionValidateSchema } = require("../../validators/rbac/rbac.validator.schema");
const Controller = require("../controller");

class PermissionController extends Controller {
    async getAllPermissoins(req, res, next) {
        try {
            const permissions = await PermissionModel.find({})

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createPermission(req, res, next) {
        try {
            await addPermissionValidateSchema.validate(req.body)           

            const {name, description} = req.body

            const permission = await this.findPermission(name)
            if(permission) throw createHttpError.BadRequest("این دسترسی قبلا ثبت شده است")

            const result = await PermissionModel.create({name, description})
            if(!result) throw createHttpError.InternalServerError("دسترسی ایجاد نشد")

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    messsage: "دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createPermissionForSection(req, res, next) {
        try {
            const {section} = req.body
            
            const query = [
                {name: `create-${section}`},
                {name: `read-${section}`},
                {name: `update-${section}`},
                {name: `delete-${section}`},
            ]

            const result = await PermissionModel.create(query)
            if(!result) throw createHttpError.InternalServerError("دسترسی ها ایجاد نشد")

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "دسترسی ها با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updatePermission(req, res, next) {
        try {
            const {permissionId} = req.params

            const permission = this.findPermission(permissionId)
            if(!permission) throw createHttpError.NotFound("دسترسی مورد نظر یافت نشد")

            const data = JSON.parse(JSON.stringify(req.body))

            const result = await PermissionModel.updateOne({_id: permissionId},{
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش دسترسی نا موفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "دسترسی با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removePermission(req, res, next) {
        try {
            const {permissionId} = req.params

            const permission = await this.findPermission(permissionId)
            if(!permission) throw createHttpError.NotFound("دسترسی مورد نظر یافت نشد")

            const result = await PermissionModel.deleteOne({_id: permissionId})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف دسترسی ناموفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "دسترسی مورد نظر با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findPermission(field) {
        const query = mongoose.isValidObjectId(field) ? {_id: field} : {name: field}
        const permission = await PermissionModel.findOne(query)
        return permission
    }
}

module.exports = {
    PermissionController: new PermissionController()
}