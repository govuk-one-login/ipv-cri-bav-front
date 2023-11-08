module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/prove-identity-bank-account";
   // this.firstName;
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async checkErrorText() {
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim();
  }

};



