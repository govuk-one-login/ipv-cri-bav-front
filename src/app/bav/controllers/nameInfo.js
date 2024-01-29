const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const rsa = require("node-rsa");

class NameInfoController extends BaseController {
  async saveValues(req, res, next) {
    try {
      const encryptedJSON = await this.getNameInfo(req.axios, req);
      const key = await this.getDecryptKey(req.axios, req);
      const decryptKey = new rsa(key);
      const decryptedJSON = decryptKey.decrypt(encryptedJSON, "utf8");
      const decryptedObject = JSON.parse(decryptedJSON);
      const decryptedName = decryptedObject.name;

      req.sessionModel.set("fullName", decryptedName);
    } catch (error) {
      console.log("Failed to fetch or decrypt full name ", error);
      next(error);
    }

    super.saveValues(req, res, next);
  }

  async getNameInfo(axios, req) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId,
    };
    const res = await axios.get(`${API.PATHS.GET_NAME_INFO}`, {
      headers,
    });
    return res.data;
  }

  async getDecryptKey(axios) {
    const res = await axios.get(`${API.PATHS.GET_NAME_INFO_DECRYPT_KEY}`);
    return res.data.key;
  }
}

module.exports = NameInfoController;
