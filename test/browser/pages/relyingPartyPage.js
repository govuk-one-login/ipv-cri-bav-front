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
    const claim = require("../support/shared_claim");

    const postRequest = await axios.post(process.env.IPV_STUB_URL, claim);

    const queryString = postRequest.data.AuthorizeLocation.split("?")[1];
    const authorizeLocation = `${process.env.FRONTEND_BASE_URL}/oauth2/authorize?${queryString}`
    
    await this.page.goto(authorizeLocation);
  }
};
