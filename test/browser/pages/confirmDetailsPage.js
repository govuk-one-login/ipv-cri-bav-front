module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/confirm-details";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async back() {
    await this.page.click("#back");
  }

  async goBack() {
    await this.page.goBack();
  }

  async clickChangeLink() {
    await this.page
      .locator('[href*="/enter-account-details/edit"]')
      .first()
      .click();
  }

  async clickDoNotContinueToBankDetailsCheck() {
    await this.page.locator('[href*="/abort"]').click();
  }

  async clickSubmitDetailsButton() {
    await this.page.locator("#submitDetails").click();
  }
};
