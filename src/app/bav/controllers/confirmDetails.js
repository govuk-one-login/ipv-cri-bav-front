const BaseController = require("hmpo-form-wizard").Controller;

class ConfirmDetailsController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
            if (err) {
              return callback(err, locals);
            }

            const sharedClaims = req.session?.shared_claims;
            console.log("---------",sharedClaims)
        
            if (sharedClaims && sharedClaims?.name?.length > 0) {
                let names = sharedClaims.name[0].nameParts
                console.log("------", names[0].value)
                console.log("------", names[names.length-2].value)
                console.log("------", names[names.length-1].value)
                req.sessionModel.set("firstName", names[0].value);
                req.sessionModel.set("middleName", names[names.length-2].value);
                req.sessionModel.set("lastName", names[names.length-1].value);
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
    
    callback(err, locals);
    })
}}



module.exports = ConfirmDetailsController; 