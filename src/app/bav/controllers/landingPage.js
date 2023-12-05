const BaseController = require("hmpo-form-wizard").Controller;

class LandingPageController extends BaseController {
    async saveValues(req, res, next) {
        req.sessionModel.set("isLanding", true);
        super.saveValues(req, res, next);
    }   
}


module.exports = LandingPageController;
