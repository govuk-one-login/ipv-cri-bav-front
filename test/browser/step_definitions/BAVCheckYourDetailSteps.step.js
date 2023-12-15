const { Given, Then, When } = require("@cucumber/cucumber");
const {
  ConfirmDetailsPage,
  AccountDetailsEditPage,
  AbortPage,
  LoadBankDetailsPage,
  AccountDetailsPage,
} = require("../pages");
const { expect } = require("@playwright/test");

Given("the user wishes to proceed", async function () {
  const cyaPage = new ConfirmDetailsPage(await this.page);
  expect(await cyaPage.isCurrentPage()).toBeTruthy();
});

When(
  "they click on the Continue to bank details check button",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickSubmitDetailsButton();
  }
);

When(
  "the user clicks the Change button to change their Sort code or Account number",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickChangeLink();
  }
);

When(
  "the user edits the sort code {string} and the account number {string}",
  async function (sortCode, accountNo) {
    const accDetailsEditPage = new AccountDetailsEditPage(await this.page);
    await accDetailsEditPage.editSortCode(sortCode);
    await accDetailsEditPage.editAccountNumber(accountNo);
    await accDetailsEditPage.continueButton();
  }
);

When("the user clicks the “Back” link on the CYA page", async function () {
  const cyaPage = new ConfirmDetailsPage(await this.page);
  await cyaPage.back();
});

When(
  "the user clicks the browser Back button on the CYA page",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.goBack();
  }
);

When(
  "they click on the “I do not want to continue to bank details check” link",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickDoNotContinueToBankDetailsCheck();
  }
);

Then(
  "the user is directed to the Loading Bank Details screen",
  async function () {
    const loadBankDetails = new LoadBankDetailsPage(await this.page);
    await loadBankDetails.isCurrentPage();
  }
);

Then(
  "the user is redirected to the check your details page",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    expect(await cyaPage.isCurrentPage()).toBeTruthy();
  }
);

Then("they are routed to the Account Details Page", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
});

Then("Then the user is directed to the Cannot Proceed choice screen", async function () {
  const abortPage = new AbortPage(await this.page);
  await abortPage.isCurrentPage();
});
