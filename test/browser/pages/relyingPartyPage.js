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

    const location = postRequest.data.AuthorizeLocation.replace("bav-cri-front.review-bav.dev.account.gov.uk", "frontend-1673.review-bav.dev.account.gov.uk")

    await this.page.goto(location);
  }
};
