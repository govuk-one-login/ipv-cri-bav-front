const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const { formatSortCodeForSubmission } = require("../utils");
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

class CheckDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      req.sessionModel.set("isLanding", false);

      const sortCode = req.form.values.sortCode;

      req.sessionModel.set("sortCode", sortCode);
      req.sessionModel.set("accountNumber", req.form.values.accountNumber);

      locals.sortCode = sortCode;
      locals.fullName = req.sessionModel.get("fullName");
      locals.accountNumber = req.sessionModel.get("accountNumber");

      callback(err, locals);
    });
  }

  async saveValues(req, res, callback) {
    try {
      const bavData = {
        sort_code: formatSortCodeForSubmission(
          req.sessionModel.get("sortCode"),
        ),
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
      ...createPersonalDataHeaders(`${API.BASE_URL}${API.PATHS.SAVE_BAVDATA}`, req),
    };

    const res = await axios.post(`${API.PATHS.SAVE_BAVDATA}`, bavData, {
      headers,
    });

    if (res.data.attemptCount) {
      req.sessionModel.set("attemptCount", res.data.attemptCount);
    } else {
      // Reset the attemptCount if it in not included in the response
      req.sessionModel.set("attemptCount", undefined);
    }

    return res.data;
  }
}

module.exports = CheckDetailsController;
