const BaseController = require("hmpo-form-wizard").Controller;

class LandingPageController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      req.sessionModel.set("isLanding", true);
      callback(err, locals);
    });
  }
}

module.exports = LandingPageController;
