const BaseController = require("hmpo-form-wizard").Controller;
const { APP, API } = require("../../../lib/config")
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
  next() {
    return APP.PATHS.DONE
  }
  async saveValues(req, res, callback) {
    try {
      const bavData = {
        "bank_details": {
          "sort_code": this.locals.sortCode,
          "account_number": this.locals.accountNumber
        }
      }
      console.log(bavData)
      await this.saveBavData(req.axios, bavData, req);
      callback();
    } catch(error) {
      callback(error);
    }
  }
  async saveBavData(axios, bavData, req) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
    }
    const res = await axios.post(`${API.PATHS.SAVE_BAVDATA}`, bavData, {
      headers
    });
    return res.data;
  }
}

module.exports = ConfirmDetailsController;
