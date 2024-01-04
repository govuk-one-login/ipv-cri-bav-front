module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Browser} browser
   */
  constructor(page) {
    this.page = page;
    this.path = "/error";
  }

  async returnUrl() {
    const currentUrl = new URL(this.page.url());
    return currentUrl;
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async validateErrorScreen() {
    const { expect } = require("@playwright/test");
    const headerText = await this.page
      .locator("#main-content > div > div > h1")
      .textContent();
    expect(headerText.trim()).toBe(
      "Sorry, there is a problem with the service"
    );
  }

  async clickGovUkHomeButton() {
    await this.page.locator('[href*="https://www.gov.uk/"]').click();
  }

  async isGovUkHomepage() {
    const { expect } = require("@playwright/test");
    expect(new URL(this.page.url()).href).toBe("https://www.gov.uk/");
  }
};
