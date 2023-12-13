const { Given, Then, When } = require("@cucumber/cucumber");
const {
  ConfirmDetailsPage,
  AccountDetailsEditPage,
  LoadBankDetailsPage,
  AccountDetailsPage,
  AbortPage,
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
  "the user clicks on 'I cannot provide UK account details' link",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickCannotProvideUkAccDetails();
  }
);

Then(
  "the user is directed to the Loading Bank Details screen",
  async function () {
    const loadBankDetails = new LoadBankDetailsPage(await this.page);
    await loadBankDetails.isCurrentPage();
  }
);

Then("they are routed to the Account Details Page", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
});

Then("the user is directed to the Escape choice screen", async function () {
  const abortPage = new AbortPage(await this.page);
  await abortPage.isCurrentPage();
});

Then(
  "the user is redirected to the check your details page",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    expect(await cyaPage.isCurrentPage()).toBeTruthy();
  }
);

Then(
  "the Check Your Answers screen has a sort code {string} and account number {string}",
  async function (sortCode, accountNumber) {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    const savedSC = await cyaPage.getSavedSC();
    expect(savedSC).toEqual(sortCode);
    const savedAC = await cyaPage.getSavedAccNo();
    expect(savedAC).toEqual(accountNumber);
  }
);
