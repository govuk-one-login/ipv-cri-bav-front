const { When, Then } = require("@cucumber/cucumber");
const TestHarness = require("../support/TestHarness");
const { expect } = require("@playwright/test");

When(
  "the users session details are fetched the sessionTable",
  { timeout: 2 * 50000 },
  async function () {
    const url = await this.page.url().match(/code=([^&]*)/);
    const authCode = url[1];
    console.log("Code=" + authCode);
    const testHarness = new TestHarness();
    const sessionRecord = await testHarness.getSessionByAuthCode(authCode);
    this.sessionId = sessionRecord.sessionId;
  },
);

When(
  "the userInfo endpoint is initiated",
  { timeout: 2 * 50000 },
  async function () {
    const axios = require("axios");
    const baseUrl = process.env.API_BASE_URL;
    const authGetRequest = await axios.get(`${baseUrl}/authorization`, {
      headers: { "session-id": this.sessionId },
    });
    const tokenPostRequest = await axios.post(
      `${baseUrl}/token`,
      `code=${authGetRequest.data.authorizationCode.value}&grant_type=authorization_code&redirect_uri=${authGetRequest.data.redirect_uri}`,
      { headers: { "Content-Type": "text/plain" } },
    );
    this.userInfoPostRequest = await axios.post(`${baseUrl}/userinfo`, null, {
      headers: {
        Authorization: `Bearer ${tokenPostRequest.data.access_token}`,
      },
    });
  },
);

Then("the Verifiable Credential is stored as expected", async function () {
  const jwtToken =
    this.userInfoPostRequest.data[
      "https://vocab.account.gov.uk/v1/credentialJWT"
    ][0];
  console.log(jwtToken);
  const rawBody = jwtToken.split(".")[1];
  const decodedBody = JSON.parse(
    Buffer.from(rawBody.replace(/\W/g, ""), "base64url").toString(),
  );
  expect(decodedBody.vc.evidence[0].strengthScore).toEqual(3);
  expect(decodedBody.vc.evidence[0].validityScore).toEqual(2);
});

Then(
  /^all TxMA events are recorded as expected$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getSqsEventList(
        "txma/",
        this.sessionId,
        5,
      );
    } while (!sqsMessage);

    testHarness.validateTxMAEventData(sqsMessage);
  },
);
