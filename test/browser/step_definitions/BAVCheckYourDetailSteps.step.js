const { Given, Then, When } = require("@cucumber/cucumber");
const {
  ConfirmDetailsPage,
  LoadBankDetailsPage,
  AbortPage,
  FailOnePage,
} = require("../pages");
const { expect } = require("@playwright/test");

Given("the user wishes to proceed", async function () {
  const cyaPage = new ConfirmDetailsPage(await this.page);
  expect(await cyaPage.isCurrentPage()).toBeTruthy();
  await this.page.waitForLoadState("networkidle");
});

When(
  "they click on the Continue to account details check button",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickSubmitDetailsButton();
    await this.page.waitForLoadState("networkidle");
  },
);

When(
  "the user clicks the Change button to change their Sort code or Account number",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickChangeLink();
  },
);

When("the user clicks the “Back” link on the CYA page", async function () {
  const cyaPage = new ConfirmDetailsPage(await this.page);
  await cyaPage.back();
});

When(
  "the user clicks the browser Back button on the CYA page",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.goBack();
  },
);

When(
  "the user clicks on 'I cannot provide UK account details' link",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    await cyaPage.clickCannotProvideUkAccDetails();
  },
);

When("the user selects the 'Try Again' radio", async function () {
  const failOnePage = new FailOnePage(await this.page);
  await failOnePage.clickTryAgainRadio();
});

When("the user selects the 'Prove Another Way' radio", async function () {
  const failOnePage = new FailOnePage(await this.page);
  await failOnePage.clickProveAnotherWayRadio();
});

Then(
  "the user is directed to the Check Your Answers screen",
  async function () {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    expect(await cyaPage.isCurrentPage()).toBeTruthy();
  },
);

Then(
  "the user is directed to the Loading Bank Details screen",
  async function () {
    const loadBankDetails = new LoadBankDetailsPage(await this.page);
    await loadBankDetails.isCurrentPage();
    await this.page.waitForLoadState("networkidle");
  },
);

Then("the user is directed to the Escape choice screen", async function () {
  const abortPage = new AbortPage(await this.page);
  await abortPage.isCurrentPage();
});

Then("the user is redirected to the fail 1 page", async function () {
  const failPage = new FailOnePage(await this.page);
  expect(await failPage.isCurrentPage()).toBeTruthy();
});

Then(
  "the Check Your Answers screen has a sort code {string} and account number {string}",
  async function (sortCode, accountNumber) {
    const cyaPage = new ConfirmDetailsPage(await this.page);
    const savedSC = await cyaPage.getSavedSC();
    expect(savedSC).toEqual(sortCode);
    const savedAC = await cyaPage.getSavedAccNo();
    expect(savedAC).toEqual(accountNumber);
  },
);

Then("an error message is shown", { timeout: 2 * 50000 }, async function () {
  const failOnePage = new FailOnePage(await this.page);
  expect(await failOnePage.getErrorTitle()).toContain("There is a problem");
  expect(await failOnePage.getErrorText()).toContain(
    "Select what you would like to do",
  );
});

Then("the user is directed to IPV Core", async function () {
  expect(this.page.url()).toContain(
    process.env.IPV_STUB_URL.replace("/start", ""),
  );
});

Then(
  "the user should see their full name on the confirm details page",
  async function () {
    const fullName = new ConfirmDetailsPage(await this.page);
    await fullName.isFullNameDisplayed();
  },
);
