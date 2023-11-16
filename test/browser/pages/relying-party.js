
module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   *
   */

  constructor(page) {
    this.page = page;
  }

  async goto() {
    const axios = require("axios");
    const claim = require("../support/shared_claim")

    const postRequest = await axios.post(process.env.IPV_STUB_URL, claim);
    await this.page.goto(postRequest.data.AuthorizeLocation);
  }

};
