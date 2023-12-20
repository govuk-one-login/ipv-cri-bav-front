const { When, Then } = require("@cucumber/cucumber");
const { ErrorPage } = require("../pages");

When("the user navigates to a URL that returns an Error", async function () {
  const errorPage = new ErrorPage(await this.page);
  const errorPageUrl = (await errorPage.returnUrl()).href.replace(
    "prove-identity-bank-account",
    "error"
  );
  await errorPage.navigateToUrl(errorPageUrl);
});

Then("the user is directed to the Internal Error Page", async function () {
  const errorPage = new ErrorPage(await this.page);
  await errorPage.validateErrorScreen();
});

When("the user clicks the Gov.UK Homepage button", async function () {
  const errorPage = new ErrorPage(await this.page);
  await errorPage.clickGovUkHomeButton();
});

Then("the user is are routed to the Gov.UK Homepage", async function () {
  const errorPage = new ErrorPage(await this.page);
  await errorPage.isGovUkHomepage();
});
