const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;
const CheckDetailsController = require("./checkDetails");
const { API } = require("../../../lib/config");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");

jest.mock("axios");

describe("CheckDetailsController", () => {
  let checkDetailsController;
  let req;
  let res;
  let callback;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    callback = setup.next;

    checkDetailsController = new CheckDetailsController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(checkDetailsController).toBeInstanceOf(BaseController);
  });

  describe("#locals", () => {
    it("should set the isLanding sessionModel property to false", () => {
      req.form.values.sortCode = "123456";
      checkDetailsController.locals(req, res, callback);
      expect(req.sessionModel.get("isLanding")).toEqual(false);
    });
  });

  describe("#saveValues", () => {
    it("should submit the bav data", async () => {
      req.axios.post.mockResolvedValue({
        data: { message: "Success" },
      });
      jest.spyOn(req.sessionModel, "get").mockReturnValueOnce("12-34-56");
      jest.spyOn(req.sessionModel, "get").mockReturnValueOnce("00000000");
      req.session.tokenId = "sessionId";

      await checkDetailsController.saveValues(req, res, callback);

      expect(req.axios.post).toHaveBeenCalledWith(
        `${API.PATHS.SAVE_BAVDATA}`,
        { sort_code: "123456", account_number: "00000000" },
        { headers: { "x-govuk-signin-session-id": "sessionId" } }
      );
    });
  });

  describe("#saveBavData", () => {
    it("should increment the retryCount sessionModel property when retryCount returned in API call", async () => {
      axios.post.mockResolvedValue({
        data: {
          message: "Success",
          retryCount: 1,
        },
      });

      const bavData = {};
      await checkDetailsController.saveBavData(axios, bavData, req);

      expect(req.sessionModel.get("retryCount")).toEqual(1);
    });

    it("should return undefined for retryCount sessionModel property when retryCount returned in API call as undefined", async () => {
      axios.post.mockResolvedValue({
        data: {
          message: "Success",
          retryCount: undefined,
        },
      });

      const bavData = {};
      await checkDetailsController.saveBavData(axios, bavData, req);

      expect(req.sessionModel.get("retryCount")).toEqual(undefined);
    });
  });
});
