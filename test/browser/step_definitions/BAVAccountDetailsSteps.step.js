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

Given("the user has filled all input fields correctly", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  const validSortCode = await accDetailsPage.enterSortCode();
  expect(validSortCode).toBe(1);
  const validAccNo = await accDetailsPage.enterAccountNumber();
  expect(validAccNo).toBe(1);
});

Given(
  "the user has left either the account number or sort code field empty",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    const validSortCode = await accDetailsPage.enterSortCode();
    expect(validSortCode).toBe(1);
  }
);

Given(
  "the user has entered a sort code in the wrong format",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    const validSCFormat = await accDetailsPage.verifySCFormat();
    expect(validSCFormat).toBe(0);
    const validAccNo = await accDetailsPage.enterAccountNumber();
    expect(validAccNo).toBe(1);
  }
);

Given(
  "the user has entered an account number in the wrong format",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    const validSortCode = await accDetailsPage.enterSortCode();
    expect(validSortCode).toBe(1);
    const validAccNoFormat = await accDetailsPage.verifyANFormat();
    expect(validAccNoFormat).toBe(0);
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
