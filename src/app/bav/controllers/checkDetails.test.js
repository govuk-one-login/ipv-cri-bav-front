const BaseController = require("hmpo-form-wizard").Controller;
const CheckDetailsController = require("./checkDetails");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");
const axios = require("axios");
const { API } = require("../../../lib/config");

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
    it("should save the BAV data", async () => {
      jest.spyOn(req.axios, "post");
      jest.spyOn(req.sessionModel, "get").mockReturnValueOnce("00-00-00");
      jest.spyOn(req.sessionModel, "get").mockReturnValueOnce("1234567");

      await checkDetailsController.saveValues(req, res, callback);

      expect(req.axios.post).toHaveBeenCalledWith(
        `${API.PATHS.SAVE_BAVDATA}`,
        { sort_code: "000000", account_number: "1234567" },
        { headers: { "x-govuk-signin-session-id": req.session.tokenId } }
      );
    });
  });

  describe("#saveBavData", () => {
    it("should increment the attemptCount sessionModel property when attemptCount returned in API call", async () => {
      axios.post.mockResolvedValue({
        data: {
          message: "Success",
          attemptCount: 1,
        },
      });

      const bavData = {};
      await checkDetailsController.saveBavData(axios, bavData, req);

      expect(req.sessionModel.get("attemptCount")).toEqual(1);
    });

    it("should return undefined for attemptCount sessionModel property when attemptCount returned in API call as undefined", async () => {
      axios.post.mockResolvedValue({
        data: {
          message: "Success",
        },
      });

      const bavData = {};
      await checkDetailsController.saveBavData(axios, bavData, req);

      expect(req.sessionModel.get("attemptCount")).toEqual(undefined);
    });
  });
});
