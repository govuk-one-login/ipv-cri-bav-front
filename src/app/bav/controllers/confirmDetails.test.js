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

  it("should increment the attemptCount sessionModel property when attemptCount returned in API call", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Success",
        attemptCount: 1,
      },
    });

    const bavData = {};
    await confirmDetailsController.saveBavData(axios, bavData, req);

    expect(req.sessionModel.get("attemptCount")).toEqual(1);
  });

  it("should return undefined for attemptCount sessionModel property when attemptCount returned in API call as undefined", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Success",
      },
    });

    const bavData = {};
    await confirmDetailsController.saveBavData(axios, bavData, req);

    expect(req.sessionModel.get("attemptCount")).toEqual(undefined);
  });
});
