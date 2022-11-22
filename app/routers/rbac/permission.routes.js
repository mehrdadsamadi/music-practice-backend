const { PermissionController } = require('../../controllers/rbac/permission.controller');

const router = require('express').Router();

router.get("/get-all", PermissionController.getAllPermissoins)
router.post("/add", PermissionController.createPermission)
router.post("/add-section", PermissionController.createPermissionForSection)
router.patch("/update/:permissionId", PermissionController.updatePermission)
router.delete("/remove/:permissionId", PermissionController.removePermission)

module.exports = {
    PermissionRoutes: router
}