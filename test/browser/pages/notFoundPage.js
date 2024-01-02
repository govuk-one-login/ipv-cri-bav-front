module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/not-found";
  }

  async returnUrl() {
    const currentUrl = new URL(this.page.url());
    return currentUrl;
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async validatePageNotFoundScreen() {
    const { expect } = require("@playwright/test");
    const headerText = await this.page.locator("#header").textContent();
    expect(headerText.trim()).toBe("Page not found");
  }
};
