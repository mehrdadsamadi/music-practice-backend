const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { mongoose } = require("mongoose");

const { RoleModel } = require("../../models/role.model");
const { addRoleValidteSchema } = require("../../validators/rbac/rbac.validator.schema");
const Controller = require("../controller");

class RoleController extends Controller {
    async getAllRole(req, res, next) {
        try {
            const roles = await RoleModel.find({}).populate("permissions")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addRole(req, res, next) {
        try {
            await addRoleValidteSchema.validate(req.body)
            
            const {title, description, permissions} = req.body
            req.body["title"] = req.body["title"].toUpperCase()

            const role = await RoleModel.findOne({title})
            if(role) throw createHttpError.BadRequest("نقشی با این عنوان وجود دارد")

            await RoleModel.create({title, description, permissions})

            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    message: "نقش با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateRole(req, res, next) {
        try {
            const {roleId} = req.params

            const role = await RoleModel.findOne({_id: roleId})
            if(!role) throw createHttpError.NotFound("نقشی با این آیدی یافت نشد")

            const data = JSON.parse(JSON.stringify(req.body))

            const result = await RoleModel.updateOne({_id: roleId}, {
                $set: data
            })
            if(!result.modifiedCount) throw createHttpError.InternalServerError("ویرایش نقش نا موفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "ویرایش نقش با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeRole(req, res, next) {
        try {
            const {field} = req.params //field can be title or id

            let query = mongoose.isValidObjectId(field) ? {_id: field} : {title: field}

            const role = await RoleModel.findOne(query)
            if(!role) throw createHttpError.NotFound("نقشی با این نام یا آیدی یافت نشد")

            const result = await RoleModel.deleteOne({_id: role._id})
            if(!result.deletedCount) throw createHttpError.InternalServerError("حذف نقش نا موفق بود")

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "حذف نقش با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    RoleController: new RoleController()
}