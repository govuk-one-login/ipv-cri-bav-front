module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-account-details";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continueButton() {
    await this.page.click("#continue");
  }
  
  async back() {
    await this.page.click("#back");
  }

  async goBack() {
    await this.page.goBack();
  }

  async checkErrorText() {
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim()
  }

  async enterSortCode(){
    let scValid;
     const sortCode = this.page.locator("#sortCode");
     await sortCode.fill("12-34-56");
     const actualInputVal= await sortCode.inputValue();

    if (actualInputVal.length == 6 || actualInputVal.length == 8){
        scValid = 1;
    } 
    else {
      scValid = 0;
    }
      return scValid;
  }

  async enterAccountNumber(){
    let accNumValid;
    const accNum = this.page.locator("#accountNumber")
    await accNum.fill("31926819");
    const accNumInputVal = await accNum.inputValue();

   // if (accNumInputVal.length == 6 || accNumInputVal.length == 7 || accNumInputVal.length == 8){
    if ( accNumInputVal.match(/^\d{6}$/) || accNumInputVal.match(/^\d{7}$/)  || accNumInputVal.match(/^\d{8}$/)){
      accNumValid = 1;
    } 
    else {
      accNumValid = 0;
    }
     return accNumValid;
  }

  async verifySCFormat() {
    let scValidFormat;
    const sortCode = this.page.locator("#sortCode");
    await sortCode.fill("12 34 ");
    const actualInputVal = await sortCode.inputValue();

    if ((actualInputVal.match(/^\d{2}-\d{2}-\d{2}$/) || (actualInputVal.match(/^\d{6}$/)) || (actualInputVal.match(/^\d{2}\s\d{2}\s\d{2}$/)))) {
      scValidFormat = 1;
    }
    else {
      scValidFormat = 0;
    }
    return scValidFormat;
  }


  async verifyANFormat() {
    let accNumValid;
    const accNum = this.page.locator("#accountNumber")
    await accNum.fill("319268190");
    const accNumInputVal = await accNum.inputValue();

    if (accNumInputVal.match(/^\d{6}$/) || accNumInputVal.match(/^\d{7}$/) || accNumInputVal.match(/^\d{8}$/)) {
      accNumValid = 1;
    }
    else {
      accNumValid = 0;
    }
    return accNumValid;
  }

}

