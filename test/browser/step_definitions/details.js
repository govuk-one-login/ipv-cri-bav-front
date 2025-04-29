const { Given, Then, When } = require("@cucumber/cucumber");
const { RelyingPartyPage, BavLandingPage } = require("../pages");
const { expect } = require("@playwright/test");
const { injectAxe } = require("axe-playwright");
const axe = require("axe-core");

Given(/^a user has navigated to the BAV Landing Page$/, async function () {
  const rpPage = new RelyingPartyPage(this.page);
  const bavLandingPage = new BavLandingPage(this.page);
  const claim = require("../support/shared_claim.json");

  await rpPage.goto(claim);
  expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
});

Then("the language toggle is present on the screen", async function () {
  const bavLandingPage = new BavLandingPage(this.page);
  await bavLandingPage.languageTogglePresent();
});

Then("the page should conform to WCAG 2.2 AA guidelines", async function () {
  await injectAxe(this.page);

  // Run Axe for WCAG 2.2 AA rules
  const wcagResults = await this.page.evaluate(() => {
    return axe.run({
      runOnly: ["wcag2aa"],
    });
  });

  expect(wcagResults.violations, "WCAG 2.2 AA violations found").toHaveLength(
    0,
  );
});

Then(
  "The HTML Language Attribute is set to {string}",
  async function (languageAttribute) {
    const bavLandingPage = new BavLandingPage(this.page);
    expect(await bavLandingPage.returnLanguageAttribute()).toBe(
      languageAttribute,
    );
  },
);

When("the user switches language to {string}", async function (language) {
  const bavLandingPage = new BavLandingPage(this.page);
  await bavLandingPage.selectLanguageToggle(language);
});

When(
  "the language toggle updates the {string} hyperlink",
  async function (language) {
    const bavLandingPage = new BavLandingPage(this.page);
    expect(await bavLandingPage.returnLanguageToggleHref(language)).toBeNull();
  },
);

Then("the {string} cookie has been set", async function (cookieName) {
  const cookies = await this.page.context().cookies();
  const expectedCookie = cookies.find((cookie) => cookie.name === cookieName);
  expect(expectedCookie).to.exist;
});
