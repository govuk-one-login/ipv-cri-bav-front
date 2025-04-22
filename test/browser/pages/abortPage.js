module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/abort";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    console.log("pathName = " + this.path + " Actual Path = " + pathname);
    return pathname === this.path;
  }
};
