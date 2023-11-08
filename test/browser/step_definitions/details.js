const { Given, Then, When } = require("@cucumber/cucumber");
const { RelyingPartyPage, NameEntryPage }  = require("../pages");
const { expect } = require("@playwright/test");
//import {expect, jest, test} from '@jest/globals';

Given(/^([A-Za-z ])+is using the system$/, {timeout: 2 * 5000}, async function (name) {
  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.goto();
});

When("they have provided their details", {
  timeout: 10 * 1000
},
  async function () { }
);


Then("they should be redirected to the nameEntry", async function () {
  const nameEntry = new NameEntryPage(await this.page);
  
  expect(await nameEntry.isCurrentPage()).toBeTruthy();
});


Then("they should be redirected as an error", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasErrorQueryParams()).to.be.true;
});
