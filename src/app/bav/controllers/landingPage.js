const BaseController = require("hmpo-form-wizard").Controller;

class LandingPageController extends BaseController {
  locals(req, res, ) {
    super.locals(req, res, () => {
      req.sessionModel.set("isLanding", true);
    });
  }
}

module.exports = LandingPageController;
