const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims && sharedClaims?.name?.length > 0) {
      let names = sharedClaims.name[0].nameParts;
      req.sessionModel.set("firstName", names[0].value);
      req.sessionModel.set("surname", names[names.length - 1].value);
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
