const { Given, Then, When } = require("@cucumber/cucumber");
const { RelyingPartyPage, ProveIdentityPage, BavLandingPage }  = require("../pages");
const { expect } = require("@playwright/test");

Given(/^([A-Za-z ])+has navigated to the BAV Landing Page$/, {timeout: 2 * 5000}, async function (name) {
  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);
  const bavLandingPage = new BavLandingPage(await this.page);

  await rpPage.goto();
  expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
});
