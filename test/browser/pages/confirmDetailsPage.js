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

  async clickCannotProvideUkAccDetails() {
    await this.page.click('[href*="/cannot-proceed"]');
  }

  async clickSubmitDetailsButton() {
    await this.page.locator("#submitDetails").click();
  }

  async getAmendedSortCode(newSortcode) {
    const sort_code = this.page.locator("dd.govuk-summary-list__value").nth(1);
    let scInputVal = await sort_code.textContent();
    scInputVal = scInputVal.trim();

    if (scInputVal.length == newSortcode.length) {
      if (newSortcode.match(/^\d{2}\s\d{2}\s\d{2}$/)) {
        scInputVal = scInputVal.replaceAll("-", " ");
        return scInputVal;
      }

      if (newSortcode.match(/^\d\d-\d\d-\d\d$/)) {
        return scInputVal;
      }
    }

    if (scInputVal.length != newSortcode.length) {
      if (newSortcode.match(/^\d{6}$/)) {
        scInputVal = scInputVal.replaceAll("-", "");
        return scInputVal;
      }
    }
  }

  async getAmendedAccNo() {
    const accNo = this.page.locator(".govuk-summary-list__value").nth(2);
    const accNoInputVal = await accNo.textContent();
    return accNoInputVal.trim();
  }
};
