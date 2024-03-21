const { When, Then } = require("@cucumber/cucumber");
const { BavLandingPage } = require("../pages");
const { expect } = require("@playwright/test");

When("the user clicks on Continue button", async function () {
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.continueToAccountDetails();
});

When(
  "the user clicks on 'How we use your bank details' link",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.clickHowWeUseBankDetails();
  },
);

Then("they are routed to the BAV Landing Page", async function () {
  const landingPage = new BavLandingPage(await this.page);
  expect(await landingPage.isCurrentPage()).toBeTruthy();
});

Then(
  "the 'How we use your bank details' information is presented to the user",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.isHowWeUseBankDetailsSectionDisplayed();
  },
);

When(
  "the user clicks the 'I cannot provide UK current account details' link",
  async function () {
    const landingPage = new BavLandingPage(await this.page);
    await landingPage.clickFindOtherWaysToProveIdentity();
  },
);

Then("the user is redirected to the BAV landing page", async function () {
  const landingPage = new BavLandingPage(await this.page);
  expect(await landingPage.isCurrentPage()).toBeTruthy();
});
