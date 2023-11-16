const { When, Then } = require("@cucumber/cucumber");
const { BavLandingPage, AccountDetailsPage, AbortPage }  = require("../pages");

When("the user clicks on Continue button", async function () {  
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.continueToAccountDetails();
});

Then("the user is directed to the Account Details screen", async function () {
  const accountDetailsPage = new AccountDetailsPage(await this.page);
  await accountDetailsPage.isCurrentPage();
});

When("the user clicks on 'How we use your bank details' link", async function () {  
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.clickHowWeUseBankDetails();
});

Then("the 'How we use your bank details' information is presented to the user", async function () {
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.isHowWeUseBankDetailsSectionDisplayed();
});

When("the user clicks on 'Find other ways to prove your identity' link", async function () {  
  const landingPage = new BavLandingPage(await this.page);
  await landingPage.clickFindOtherWaysToProveIdentity();
});

Then("the user is directed to the Abort screen", async function () {
  const abortPage = new AbortPage(await this.page);
  await abortPage.isCurrentPage();
});
