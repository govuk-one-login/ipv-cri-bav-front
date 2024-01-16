const BaseController = require("hmpo-form-wizard").Controller;
const ConfirmDetailsController = require("./confirmDetails");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");
const axios = require("axios");
jest.mock("axios");

describe("ConfirmDetailsController", () => {
  let confirmDetailsController;
  let req;
  let res;
  let callback;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    callback = setup.next;

    confirmDetailsController = new ConfirmDetailsController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(confirmDetailsController).toBeInstanceOf(BaseController);
  });

  it("should set the isLanding sessionModel property to false", () => {
    req.form.values.sortCode = "123456";
    confirmDetailsController.locals(req, res, callback);
    expect(req.sessionModel.get("isLanding")).toEqual(false);
  });

  it("should increment the retryCount sessionModel property when retryCount returned in API call", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Success",
        retryCount: 1,
      },
    });

    const bavData = {};
    await confirmDetailsController.saveBavData(axios, bavData, req);

    expect(req.sessionModel.get("retryCount")).toEqual(1);
  });
});
