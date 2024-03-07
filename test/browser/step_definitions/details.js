const { Given } = require("@cucumber/cucumber");
const { RelyingPartyPage, BavLandingPage } = require("../pages");
const { expect } = require("@playwright/test");

Given(/^a user has navigated to the BAV Landing Page$/, async function () {
  const rpPage = new RelyingPartyPage(this.page);
  const bavLandingPage = new BavLandingPage(this.page);
  const claim = require("../support/shared_claim.json");

  await rpPage.goto(claim);
  expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
});


