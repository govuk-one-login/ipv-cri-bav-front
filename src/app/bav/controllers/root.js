const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {

  //TODO: Call new fetchNameInfo Lambda to users name as single string
		// req.sessionModel.set("fullName", data.full_name);

		req.sessionModel.set("fullName", "John Peter Smith");

    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
