const BaseController = require("hmpo-form-wizard").Controller;
const NameInfoController = require("./nameInfo.js");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers.js");
const {
  API: {
    PATHS: { GET_NAME_INFO, GET_NAME_INFO_DECRYPT_KEY },
  },
} = require("../../../lib/config");

jest.mock("node-rsa", () => {
  return jest.fn().mockImplementation(() => ({
    decrypt: () => JSON.stringify({ name: "Jason Smith" }),
  }));
});

describe("NameInfoController", () => {
  const nameInfoController = new NameInfoController({ route: "/test" });
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be an instance of BaseController", () => {
    expect(nameInfoController).toBeInstanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should retrieve, decrypt and save fullName info to sessionModel", async () => {
      req.axios.get.mockReturnValue({ data: {} });
      var decryptedName = "Jason Smith";

      await nameInfoController.saveValues(req, res, next);

      const fullName = req.sessionModel.get("fullName");
      expect(fullName).toEqual(decryptedName);
      expect(req.axios.get).toHaveBeenNthCalledWith(1, GET_NAME_INFO, {
        headers: {
          "x-govuk-signin-session-id": req.session.tokenId,
        },
      });
      expect(req.axios.get).toHaveBeenNthCalledWith(
        2,
        GET_NAME_INFO_DECRYPT_KEY,
      );
    });
  });
});
