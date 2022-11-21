const Controller = require("../controller");

class RoleController extends Controller {
    async getAllRole(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    RoleController: new RoleController()
}