const { Given } = require("@cucumber/cucumber");
const { RelyingPartyPage, BavLandingPage }  = require("../pages");
const { expect } = require("@playwright/test");

Given(/^([A-Za-z ])+has navigated to the BAV Landing Page$/, {timeout: 2 * 5000}, async function (name) {
  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);
  const bavLandingPage = new BavLandingPage(this.page);

  await rpPage.goto();
  expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
});
