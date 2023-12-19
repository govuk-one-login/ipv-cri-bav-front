const BaseController = require("hmpo-form-wizard").Controller;
const LandingPageController = require("./landingPage");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");

describe("LandingPageController", () => {
  let landingPageController;
  let req;
  let res;
  let callback

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    callback = setup.next

    landingPageController = new LandingPageController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(landingPageController).toBeInstanceOf(BaseController);
  });

  it("should set the isLanding sessionModel property to true", () => {
    landingPageController.locals(req, res, callback);
    expect(req.sessionModel.get("isLanding")).toEqual(true);
  });
});
