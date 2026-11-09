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
    if (process.env.CUSTOM_FE_URL)
      claim.frontendURL = process.env.CUSTOM_FE_URL;
    const postRequest = await req.customFetch(
      process.env.IPV_STUB_URL + "start",
      claim,
    );

    await this.page.goto(postRequest.data.AuthorizeLocation);
  }
};
