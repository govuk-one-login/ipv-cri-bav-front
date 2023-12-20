const { When, Then } = require("@cucumber/cucumber");
const { NotFoundPage } = require("../pages");

When("the user navigates to a URL that does not exist", async function () {
  const notFoundPage = new NotFoundPage(await this.page);
  const notFoundUrl = (await notFoundPage.returnUrl()).href.replace("prove-identity-bank-account","not-found");
  await notFoundPage.navigateToUrl(notFoundUrl);
});

Then("the user is directed to the Not Found screen", async function () {
  const notFoundPage = new NotFoundPage(await this.page);
  await notFoundPage.validatePageNotFoundScreen();
});