const BAV_COP_REQUEST_SENT = require("../support/BAV_COP_REQUEST_SENT_SCHEMA.json");
const BAV_COP_RESPONSE_RECEIVED = require("../support/BAV_COP_RESPONSE_RECEIVED_SCHEMA.json");
const BAV_CRI_END = require("../support/BAV_CRI_END_SCHEMA.json");
const BAV_CRI_START = require("../support/BAV_CRI_START_SCHEMA.json");
const BAV_CRI_VC_ISSUED = require("../support/BAV_CRI_VC_ISSUED_SCHEMA.json");
const axios = require("axios");
const aws4Interceptor = require("aws4-axios").aws4Interceptor;
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");
const { XMLParser } = require("fast-xml-parser");
const { expect } = require("@playwright/test");

module.exports = class TestHarness {
  constructor() {
    this.HARNESS_API_INSTANCE = axios.create({
      baseURL: process.env["TEST_HARNESS_URL"],
    });
    const customCredentialsProvider = {
      getCredentials: fromNodeProviderChain({
        timeout: 1000,
        maxRetries: 0,
      }),
    };
    const awsSigv4Interceptor = aws4Interceptor({
      options: {
        region: "eu-west-2",
        service: "execute-api",
      },
      credentials: customCredentialsProvider,
    });

    this.HARNESS_API_INSTANCE.interceptors.request.use(awsSigv4Interceptor);
  }

  async getSession(sessionId) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getRecordBySessionId/" +
          process.env["SESSION_TABLE"] +
          "/" +
          sessionId
      );
      return unmarshall(getItemResponse.data.Item);
    } catch (error) {
      return error;
    }
  }

  async getSessionByAuthCode(authCode) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getSessionByAuthCode/" + process.env["SESSION_TABLE"] + "/" + authCode
      );
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      return error;
    }
  }

  async getDequeuedSqsMessage(prefix) {
    const listObjectsResponse = await this.HARNESS_API_INSTANCE.get(
      "/bucket/",
      {
        params: {
          prefix: "ipv-core/" + prefix,
        },
      }
    );
    const xmlParser = new XMLParser();
    const listObjectsParsedResponse = xmlParser.parse(listObjectsResponse.data);
    if (!listObjectsParsedResponse?.ListBucketResult?.Contents) {
      return undefined;
    }
    let key;
    if (Array.isArray(listObjectsParsedResponse?.ListBucketResult?.Contents)) {
      key = listObjectsParsedResponse.ListBucketResult.Contents.at(-1).Key;
    } else {
      key = listObjectsParsedResponse.ListBucketResult.Contents.Key;
    }

    const getObjectResponse = await this.HARNESS_API_INSTANCE.get(
      "/object/" + key,
      {}
    );
    return getObjectResponse.data;
  }

  async getSqsEventList(folder, prefix, txmaEventSize) {
    let keys;
    let keyList;
    let i;
    do {
      const listObjectsResponse = await this.HARNESS_API_INSTANCE.get(
        "/bucket/",
        {
          params: {
            prefix: folder + prefix,
          },
        }
      );
      const xmlParser = new XMLParser();
      const listObjectsParsedResponse = xmlParser.parse(
        listObjectsResponse.data
      );
      if (!listObjectsParsedResponse?.ListBucketResult?.Contents) {
        return undefined;
      }
      keys = listObjectsParsedResponse?.ListBucketResult?.Contents;
      console.log(listObjectsParsedResponse?.ListBucketResult?.Contents);
      keyList = [];
      for (i = 0; i < keys.length; i++) {
        keyList.push(
          listObjectsParsedResponse?.ListBucketResult?.Contents.at(i).Key
        );
      }
    } while (keys.length < txmaEventSize);
    return keyList;
  }

  async validateTxMAEventData(keyList) {
    let i;
    let valid = true;
    for (i = 0; i < keyList.length; i++) {
      const getObjectResponse = await this.HARNESS_API_INSTANCE.get(
        "/object/" + keyList[i],
        {}
      );
      console.log(JSON.stringify(getObjectResponse.data, null, 2));
      const eventName = getObjectResponse.data.event_name;
      const Ajv = require("ajv").default;
      const AjvFormats = require("ajv-formats");
      const ajv = new Ajv({ strictTuples: false });

      AjvFormats(ajv);

      switch (eventName) {
        case "BAV_COP_REQUEST_SENT": {
          const validate = ajv.compile(BAV_COP_REQUEST_SENT);
          valid = validate(getObjectResponse.data);
          if (!valid) {
            console.error(
              getObjectResponse.data.event_name +
                " Event Errors: " +
                JSON.stringify(validate.errors)
            );
          }
          break;
        }
        case "BAV_COP_RESPONSE_RECEIVED": {
          const validate = ajv.compile(BAV_COP_RESPONSE_RECEIVED);
          valid = validate(getObjectResponse.data);
          if (!valid) {
            console.error(
              getObjectResponse.data.event_name +
                " Event Errors: " +
                JSON.stringify(validate.errors)
            );
          }
          break;
        }
        case "BAV_CRI_END": {
          const validate = ajv.compile(BAV_CRI_END);
          valid = validate(getObjectResponse.data);
          if (!valid) {
            console.error(
              getObjectResponse.data.event_name +
                " Event Errors: " +
                JSON.stringify(validate.errors)
            );
          }
          break;
        }
        case "BAV_CRI_START": {
          const validate = ajv.compile(BAV_CRI_START);
          valid = validate(getObjectResponse.data);
          if (!valid) {
            console.error(
              getObjectResponse.data.event_name +
                " Event Errors: " +
                JSON.stringify(validate.errors)
            );
          }
          break;
        }
        case "BAV_CRI_VC_ISSUED": {
          const validate = ajv.compile(BAV_CRI_VC_ISSUED);
          valid = validate(getObjectResponse.data);
          if (!valid) {
            console.error(
              getObjectResponse.data.event_name +
                " Event Errors: " +
                JSON.stringify(validate.errors)
            );
          }
          break;
        }
      }
    }
    expect(valid).toEqual(true);
  }
};
