const { Given, Then, When } = require("@cucumber/cucumber");
const { BavLandingPage }  = require("../pages");
const { expect } = require("@playwright/test");

Given(/^the user wishes to proceed$/, async function () {
  const landingPage = new BavLandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;
});


When("they click on the Continue button", async function () {
  const landingPage = new BavLandingPage(await this.page);
  
  await landingPage.continue();
});


Then("the FE app serves the Account Details screen", async function () {
  const landingPage = new BavLandingPage(await this.page);

});
