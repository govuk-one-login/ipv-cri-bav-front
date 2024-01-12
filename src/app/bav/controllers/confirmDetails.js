const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const { formatSortCode } = require("../utils");

class ConfirmDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      req.sessionModel.set("isLanding", false);

      const sortCode = req.form.values.sortCode;

      req.sessionModel.set("sortCode", sortCode);
      req.sessionModel.set("accountNumber", req.form.values.accountNumber);

      locals.sortCode = formatSortCode(sortCode);
      locals.fullName = req.sessionModel.get("fullName");
      locals.accountNumber = req.sessionModel.get("accountNumber");

      callback(err, locals);
    });
  }

  async saveValues(req, res, callback) {
    try {
      const bavData = {
        sort_code: req.sessionModel.get("sortCode"),
        account_number: req.sessionModel.get("accountNumber"),
      };
      await this.saveBavData(req.axios, bavData, req);
      callback();
    } catch (error) {
      callback(error);
    }
  }

  async saveBavData(axios, bavData, req) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId,
    };
    const res = await axios.post(`${API.PATHS.SAVE_BAVDATA}`, bavData, {
      headers,
    });
    if (res.data.retryCount) {
      req.sessionModel.set("retryCount", res.data.retryCount);
    }
    return res.data;
  }
}

module.exports = ConfirmDetailsController;
