module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-account-details/edit";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    console.log("pathName = " + this.path + " Actual Path = " + pathname);
    return pathname === this.path;
  }

  async continueButton() {
    await this.page.locator("#continue").click();
  }

  async back() {
    await this.page.click("#back");
  }

  async goBack() {
    await this.page.goBack();
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator("h2.govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }

  async editSortCode(sortCode) {
    await this.page.locator("#sortCode").fill(sortCode);
  }

  async editAccountNumber(accountNo) {
    await this.page.locator("#accountNumber").fill(accountNo);
  }
};
