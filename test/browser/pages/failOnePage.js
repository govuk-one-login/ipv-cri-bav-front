module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/could-not-match-bank";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async clickTryAgainRadio() {
    await this.page.locator("#couldNotMatchChoice-tryAgain-label").click();
  }

  async clickProveAnotherWayRadio() {
    await this.page
      .locator("#couldNotMatchChoice-proveAnotherWay-label")
      .click();
  }

  async getErrorTitle() {
    const errorTitle = await this.page
      .locator("h2.govuk-error-summary__title")
      .textContent();
    return errorTitle.trim();
  }

  async getErrorText() {
    const errorText = await this.page
      .locator("p.govuk-error-message")
      .textContent();
    return errorText.trim();
  }
};
