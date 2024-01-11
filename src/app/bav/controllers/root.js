const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const rsa = require("node-rsa");

class RootController extends BaseController {

  async saveValues(req, res, next) {

    try {
      const key = await this.getDecryptKey(req.axios, req);
      const encryptedJSON = await this.getNameInfo(req.axios, req);

      const decryptKey = new rsa(key);
      const decryptedJSON = decryptKey.decrypt(encryptedJSON, "utf8");
      const decryptedObject = JSON.parse(decryptedJSON);
      const decryptedName = decryptedObject.name;

      req.sessionModel.set("fullName", decryptedName);
    } catch (error) {
      callback(error);
    }
    
    super.saveValues(req, res, next);
  }
  
  async getNameInfo(axios, req) {
    const headers = {
      "x-govuk-signin-session-id":"98b2e970-2070-47b1-bad1-57c18f53fd28",
    };
    const res = await axios.get(`${API.PATHS.GET_NAME_INFO}`, {
      headers,
    });
    return res.data;
  }

  async getDecryptKey(axios, req) {
    const res = await axios.get(`${API.PATHS.GET_NAME_INFO_DECRYPT_KEY}`);
    return res.data.key;
  }

}

module.exports = RootController;