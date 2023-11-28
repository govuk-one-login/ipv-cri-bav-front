const { Given, When, Then } = require("@cucumber/cucumber");
const {
  AccountDetailsPage,
  BavLandingPage,
  ConfirmDetailsPage,
} = require("../pages");
const { expect } = require("@playwright/test");

Given("the user is on the Account Details Screen", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
});

Given(
  "the user has entered a Sort Code of {string}",
  async function (sortCode) {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    await accDetailsPage.enterSortCode(sortCode);
  }
);

Given(
  "the user has entered an Account Number of {string}",
  async function (accountNumber) {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    await accDetailsPage.enterAccountNumber(accountNumber);
  }
);

When("the user clicks the Continue button", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  await accDetailsPage.continueButton();
});

When("the user clicks on the “Back” link", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  await accDetailsPage.back();
});

When("the user clicks on the Back button on their browser", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  await accDetailsPage.goBack();
});

Then("they are routed to the BAV Landing Page", async function () {
  const landingPage = new BavLandingPage(await this.page);
  expect(await landingPage.isCurrentPage()).toBeTruthy();
});

Then(
  "the user is directed to the Check Your Answers screen",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    expect(await cyaPage.isCurrentPage()).toBeTruthy();
  }
);

Then("an error message is shown to the user", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
  expect(await accDetailsPage.checkErrorText()).toContain("There is a problem");
});