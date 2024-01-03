const { When, Then } = require("@cucumber/cucumber");
const { BavLandingPage, AccountDetailsPage } = require("../pages");

When("the user clicks on Continue button", async function () {
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.continueToAccountDetails();
});

Then("the user is directed to the Account Details screen", async function () {
  const accountDetailsPage = new AccountDetailsPage(await this.page);
  await accountDetailsPage.isCurrentPage();
});

When(
  "the user clicks on 'How we use your bank details' link",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.clickHowWeUseBankDetails();
  }
);

Then(
  "the 'How we use your bank details' information is presented to the user",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.isHowWeUseBankDetailsSectionDisplayed();
  }
);

When(
  "the user clicks the 'I cannot provide UK current account details' link",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.clickFindOtherWaysToProveIdentity();
  }
);

Then("the user is redirected to the BAV landing page", async function () {
  const landingPage = new BavLandingPage(await this.page);
  expect(await landingPage.isCurrentPage()).toBeTruthy();
});
