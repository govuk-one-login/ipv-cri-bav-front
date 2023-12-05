const BaseController = require("hmpo-form-wizard").Controller;

class AccountDetailsController extends BaseController {
    async saveValues(req, res, next) {
        req.sessionModel.set("isLanding", false);
        super.saveValues(req, res, next);
    }   
}

module.exports = AccountDetailsController;
