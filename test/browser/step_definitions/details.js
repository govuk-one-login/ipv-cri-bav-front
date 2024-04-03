const { Given, Then, When } = require("@cucumber/cucumber");
const { RelyingPartyPage, BavLandingPage } = require("../pages");
const { expect } = require("@playwright/test");

Given(/^a user has navigated to the BAV Landing Page$/, async function () {
  const rpPage = new RelyingPartyPage(this.page);
  const bavLandingPage = new BavLandingPage(this.page);
  const claim = require("../support/shared_claim.json");

  await rpPage.goto(claim);
  expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
});

Then('the language toggle is present on the screen', async function () {
  const bavLandingPage = new BavLandingPage(this.page);
  await bavLandingPage.languageTogglePresent();
});

Then('The HTML Language Attribute is set to {string}', async function (languageAttribute) {
  const bavLandingPage = new BavLandingPage(this.page);
  expect(await bavLandingPage.returnLanguageAttribute()).toBe(languageAttribute);
});

When('the user switches language to {string}', async function (language) {
  const bavLandingPage = new BavLandingPage(this.page);
  await bavLandingPage.selectLanguageToggle(language);
});

When('the language toggle updates the {string} hyperlink', async function (language) {
  const bavLandingPage = new BavLandingPage(this.page);
  expect(await bavLandingPage.returnLanguageToggleHref(language)).toBeNull();
});
