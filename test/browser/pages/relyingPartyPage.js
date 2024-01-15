module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   *
   */

  constructor(page) {
    this.page = page;
  }

  async goto(claim) {
    const axios = require("axios");
    const postRequest = await axios.post(process.env.IPV_STUB_URL, claim);
    
    await this.page.goto(postRequest.data.AuthorizeLocation);
  }
};
