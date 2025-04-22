module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/how-continue-bank";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    console.log("pathName = " + this.path + " Actual Path = " + pathname);
    return pathname === this.path;
  }

  async continueButton() {
    await this.page.click("#continue");
  }

  async radioButtonContinue() {
    await this.page.locator("#howContinueBankChoice-goBack").click();
  }

  async radioButtonExitBav() {
    await this.page.locator("#howContinueBankChoice").check();
  }

  async goBack() {
    await this.page.goBack();
  }
};
