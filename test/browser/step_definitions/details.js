const { Given } = require("@cucumber/cucumber");
const { RelyingPartyPage, BavLandingPage } = require("../pages");
const { expect } = require("@playwright/test");

Given(
  /^([^"]*) has navigated to the BAV Landing Page$/,
  async function (name) {
    const claim = this.allUserClaims[name];
    const rpPage = new RelyingPartyPage(this.page);
    const bavLandingPage = new BavLandingPage(this.page);

    await rpPage.goto(claim);
    expect(await bavLandingPage.isCurrentPage()).toBeTruthy();
  }
);
