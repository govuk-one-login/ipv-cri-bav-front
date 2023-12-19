const BaseController = require("hmpo-form-wizard").Controller;
const { formatSortCode } = require("../utils");

class ConfirmDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      req.sessionModel.set("isLanding", false);

      const sortCode = req.form.values.sortCode;

      locals.sortCode = formatSortCode(sortCode);
      locals.accountNumber = req.form.values.accountNumber;
      locals.fullName = req.sessionModel.get("fullName");
      callback(err, locals);
    });
  }
}

module.exports = ConfirmDetailsController;
