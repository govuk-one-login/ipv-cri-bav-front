module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/continue-enter-bank-account-details";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    console.log("pathName = " + this.path + " Actual Path = " + pathname);
    return pathname === this.path;
  }

  async returnLanguageAttribute() {
    const htmlElement = await this.page.locator("html");
    return await htmlElement.getAttribute("lang");
  }

  async selectLanguageToggle(language) {
    await this.page.getByText(language).click();
  }

  async returnLanguageToggleHref(language) {
    const htmlElement = await this.page.getByText(language);
    return await htmlElement.getAttribute("href");
  }

  async languageTogglePresent() {
    const { expect } = require("@playwright/test");
    await expect(
      this.page.locator("div.govuk-width-container > nav"),
    ).toBeVisible();
  }

  async continueToAccountDetails() {
    await this.page.click("#landingPageContinue");
  }

  async clickHowWeUseBankDetails() {
    await this.page.click(".govuk-details__summary-text");
  }

  async clickFindOtherWaysToProveIdentity() {
    await this.page.click('[href*="/how-continue-bank"]');
  }

  async isHowWeUseBankDetailsSectionDisplayed() {
    const { expect } = require("@playwright/test");
    expect(
      await this.page.locator(".instruction:nth-child(1)").textContent(),
    ).toEqual("We will not save or share your account details.");
    expect(
      await this.page.locator(".instruction:nth-child(2)").textContent(),
    ).toEqual(
      "We do not use your account details to check or take any payments.",
    );
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator("h2.govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }
};
