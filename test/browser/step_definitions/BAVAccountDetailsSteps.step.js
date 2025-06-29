const { Given, When, Then } = require("@cucumber/cucumber");
const {
  AccountDetailsPage,
  AccountDetailsEditPage,
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
    await this.page.waitForLoadState("networkidle");
  },
);

Given(
  "the user has entered an Account Number of {string}",
  async function (accountNumber) {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    await accDetailsPage.enterAccountNumber(accountNumber);
    await this.page.waitForLoadState("networkidle");
  },
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

When(
  "the user edits the sort code {string} and the account number {string}",
  async function (sortCode, accountNo) {
    const accDetailsEditPage = new AccountDetailsEditPage(await this.page);
    await accDetailsEditPage.editSortCode(sortCode);
    await accDetailsEditPage.editAccountNumber(accountNo);
    await accDetailsEditPage.continueButton();
  },
);

Then("the user is directed to the Account Details screen", async function () {
  const accountDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accountDetailsPage.isCurrentPage()).toBeTruthy();
  await this.page.waitForLoadState("networkidle");
});

Then("the user is directed to the Confirm Details screen", async function () {
  const confirmDetailsPage = new ConfirmDetailsPage(await this.page);
  expect(await confirmDetailsPage.isCurrentPage()).toBeTruthy();
});

Then("an error message is shown to the user", async function () {
  const accDetailsPage = new AccountDetailsPage(await this.page);
  expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
  expect(await accDetailsPage.checkErrorText()).toContain("There is a problem");
});

Then(
  "an account number length error message is shown to the user",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    expect(await accDetailsPage.checkAccountNumberErrorText()).toContain(
      "Your account number must be between 6 and 8 digits",
    );
  },
);

Then(
  "a sort code format error message is shown to the user",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    expect(await accDetailsPage.checkSortCodeErrorText()).toContain(
      "Enter a valid sort code. For example, 802650",
    );
  },
);

Then(
  "a sort code length error message is shown to the user",
  async function () {
    const accDetailsPage = new AccountDetailsPage(await this.page);
    expect(await accDetailsPage.isCurrentPage()).toBeTruthy();
    expect(await accDetailsPage.checkSortCodeErrorText()).toContain(
      "Your sort code must be 6 digits long",
    );
  },
);
