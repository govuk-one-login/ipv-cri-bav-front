const BaseController = require("hmpo-form-wizard").Controller;

class ConfirmDetailsController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
            if (err) {
              return callback(err, locals);
            }
    
    const formatSortCode = () => {
      const sortCode = req.form.values.sortCode.split("").filter((char) => char != " " && char != "-")
      sortCode.splice(2, 0, "-")
      sortCode.splice(5, 0, "-")
      const displaySortCode = sortCode.join("")
      locals.sortCode = displaySortCode
    }
    
    formatSortCode()
    locals.fullName = req.sessionModel.get("fullName")
    locals.accountNumber = req.form.values.accountNumber
    
    callback(err, locals);
    })
}}

module.exports = ConfirmDetailsController;
