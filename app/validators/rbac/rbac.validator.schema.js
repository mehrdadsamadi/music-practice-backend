const yup = require('yup');

const addRoleValidteSchema = yup.object({
    title: yup.string().required("عنوان نقش را وارد کنید").min(3, "عنوان نقش حداقل باید 3 کاراکتر باشد").max(30, "عنوان نقش حداکثر باید 30 کاراکتر باشد"),
    description: yup.string().max(100, "توضیحات نقش حداکثر باید 100 کاراکتر باشد"),
    permissions: yup.array().of(yup.string().matches(/^[a-fA-F0-9]{24}$/, "آیدی ارسالی در قسمت دسترسی ها صحیح نمیباشد"))
})

const addPermissionValidateSchema = yup.object({
    name: yup.string().required("نام دسترسی را وارد کنید").min(3, "نام دسترسی حداقل باید 3 کاراکتر باشد").max(30, "نام دسترسی حداکثر باید 30 کاراکتر باشد"),
    description: yup.string().max(100, "توضیحات دسترسی حداکثر باید 100 کاراکتر باشد")
})

module.exports = {
    addRoleValidteSchema,
    addPermissionValidateSchema
}