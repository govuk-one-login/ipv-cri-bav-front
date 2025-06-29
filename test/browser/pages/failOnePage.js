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
    const errorTitleLocator = this.page.locator(
      "h2.govuk-error-summary__title",
    );
    await errorTitleLocator.waitFor({ state: "visible", timeout: 2 * 50000 });
    const errorTitle = await errorTitleLocator.textContent();
    return errorTitle.trim();
  }

  async getErrorText() {
    const errorTextLocator = this.page.locator(".govuk-error-summary__list");
    await errorTextLocator.waitFor({ state: "visible", timeout: 2 * 50000 });
    const errorText = await errorTextLocator.textContent();
    return errorText.trim();
  }
};
