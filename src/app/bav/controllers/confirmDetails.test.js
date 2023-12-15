const BaseController = require("hmpo-form-wizard").Controller;
const ConfirmDetailsController = require("./confirmDetails");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");

describe("ConfirmDetailsController", () => {
  let confirmDetailsController;
  let req;
  let res;
  
  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;

  confirmDetailsController = new ConfirmDetailsController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(confirmDetailsController).toBeInstanceOf(BaseController);
  });

  // it("should set the isLanding sessionModel property to false", () => {
  //   confirmDetailsController.locals(req, res)
  //   expect(req.sessionModel.get("isLanding")).toEqual(false)
  // });
});
