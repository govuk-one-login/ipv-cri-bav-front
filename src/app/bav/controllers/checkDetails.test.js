const BaseController = require("hmpo-form-wizard").Controller;
const CheckDetailsController = require("./checkDetails");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");
const axios = require("axios");
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

  it("should set the isLanding sessionModel property to false", () => {
    req.form.values.sortCode = "123456";
    checkDetailsController.locals(req, res, callback);
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
