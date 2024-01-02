const { Given, Then } = require ("@cucumber/cucumber");
const { EscapeChoicePage, BavLandingPage, ConfirmDetailsPage } = require ("../pages");
const { expect } = require ("@playwright/test");

Given("the user wishes to continue with the BAV process", async function () {
    const escapeChoicePage = new EscapeChoicePage(await this.page);
    await escapeChoicePage.radioButtonContinue();
});  

Given("the user wishes to exit the BAV process", async function () {
    const escapeChoicePage = new EscapeChoicePage(await this.page);
    await escapeChoicePage.radioButtonExitBav();
});  

Then("the user is directed to the Escape Choice screen", async function () {
    const escapeChoicePage = new EscapeChoicePage(await this.page);
    await escapeChoicePage.isCurrentPage();
});


Then("they click on the Continue button to return to the landing page", async function() {
    const escapeChoicePage = new EscapeChoicePage(await this.page);
    await escapeChoicePage.goBack();
});


Then("they click on the Continue button to return to the cya page", async function() {
    const escapeChoicePage = new EscapeChoicePage(await this.page);
    await escapeChoicePage.goBack();
});


Then("the user is redirected to the cya page", async function(){
    const cyaPage = new ConfirmDetailsPage(await this.page);
    expect(await cyaPage.isCurrentPage()).toBeTruthy();
});