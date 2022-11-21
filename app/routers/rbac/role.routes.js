const { RoleController } = require('../../controllers/rbac/role.controller');
const { stringToArray } = require('../../middlewares/stringToArray');

const router = require('express').Router();

router.get("/get-all", RoleController.getAllRole)
router.post("/add", stringToArray("permissions"), RoleController.addRole)
router.patch("/update/:roleId", stringToArray("permissions"), RoleController.updateRole)
router.delete("/remove/:field", RoleController.removeRole)

module.exports = {
    RoleRoutes: router
}