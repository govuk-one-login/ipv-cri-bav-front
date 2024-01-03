module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/cannot-proceed";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continueButton() {
    await this.page.click("#continue");
  }

  async radioButtonContinue() {
    await this.page.locator("#cannotProceedChoice-goBack").click();
  }

  async radioButtonExitBav() {
    await this.page.locator("#cannotProceedChoice").check();
  }

  async goBack() {
    await this.page.goBack();
  }
};
