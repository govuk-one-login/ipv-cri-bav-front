const { When, Then } = require("@cucumber/cucumber");
const TestHarness = require("../support/TestHarness");
const { expect } = require("@playwright/test");

When(
  "the users session details are fetched the sessionTable using {string}",
  { timeout: 2 * 50000 },
  async function (queryField) {
    const testHarness = new TestHarness();
    let sessionRecord;
    if (queryField === "authCode") {
      const url = await this.page.url().match(/code=([^&]*)/);
      sessionRecord = await testHarness.getSessionByAuthCode(url[1]);
    } else if (queryField === "state") {
      const url = await this.page.url().match(/state=([^&]*)/);
      sessionRecord = await testHarness.getSessionByState(url[1]);
    } else {
      throw new Error(`Invalid query field: ${queryField}`);
    }
    this.sessionId = sessionRecord.sessionId;
  },
);

When(
  "the userInfo endpoint is initiated",
  { timeout: 2 * 50000 },
  async function () {
    const axios = require("axios");
    const baseUrl = process.env.API_BASE_URL;
    const stubUrl = process.env.IPV_STUB_URL;
    const authGetRequest = await axios.get(`${baseUrl}/authorization`, {
      headers: { "session-id": this.sessionId },
    });
    const requestTokenRequest = await axios.post(
      `${stubUrl}generate-token-request`,
    );
    const tokenPostRequest = await axios.post(
      `${baseUrl}/token`,
      `code=${authGetRequest.data.authorizationCode.value}&grant_type=authorization_code&redirect_uri=${authGetRequest.data.redirect_uri}&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=${requestTokenRequest.data}`,
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

When(
  "I get {int} TxMA events from Test Harness",
  { timeout: 2 * 50000 },
  async function (txmaEventCount) {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getSqsEventList(
        "txma/",
        this.sessionId,
        txmaEventCount,
      );
    } while (!sqsMessage);

    this.allTxmaEventBodies = await testHarness.getTxMAEventData(sqsMessage);
  },
);

Then(
  "the {string} event matches the {string} Schema",
  { timeout: 2 * 50000 },
  async function (eventName, schemaName) {
    const testHarness = new TestHarness();
    await testHarness.validateTxMAEventData(
      this.allTxmaEventBodies,
      eventName,
      schemaName,
    );
  },
);
