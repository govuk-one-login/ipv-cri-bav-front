const BaseController = require("hmpo-form-wizard").Controller;

class ConfirmDetailsController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
            if (err) {
              return callback(err, locals);
            }

    const sortCode = req.form.values.sortCode.split("").filter((char) => char != " " && char != "-")
    sortCode.splice(2, 0, "-")
    sortCode.splice(5, 0, "-")
    const displaySortCode = sortCode.join("")
    
    locals.firstName = req.sessionModel.get("firstName")
    locals.middleName = req.sessionModel.get("middleName")
    locals.lastName = req.sessionModel.get("lastName")
    locals.sortCode = displaySortCode
    locals.accountNumber = req.form.values.accountNumber

    console.log(locals.middleName)
    
    callback(err, locals);
    })
}}



module.exports = ConfirmDetailsController; 