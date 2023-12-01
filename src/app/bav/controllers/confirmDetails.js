const BaseController = require("hmpo-form-wizard").Controller;
const { formatSortCode } = require("../utils");

class ConfirmDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const sortCode = req.form.values.sortCode;

      locals.sortCode = formatSortCode(sortCode);
      locals.fullName = req.sessionModel.get("fullName");
      locals.accountNumber = req.form.values.accountNumber;

      callback(err, locals);
    });
  }
}

module.exports = ConfirmDetailsController;
