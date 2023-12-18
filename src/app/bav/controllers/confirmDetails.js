const BaseController = require("hmpo-form-wizard").Controller;
const { formatSortCode } = require("../utils");

class ConfirmDetailsController extends BaseController {
  locals(req, res) {
    super.locals(req, res, (err, locals) => {
      req.sessionModel.set("isLanding", false);
      
      const sortCode = req.form.values.sortCode;

      locals.sortCode = formatSortCode(sortCode);
      locals.fullName = req.sessionModel.get("fullName");
      locals.accountNumber = req.form.values.accountNumber;

      
    });
  }
}

module.exports = ConfirmDetailsController;
