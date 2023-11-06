const BaseController = require("hmpo-form-wizard").Controller;
const LandingPageController = require('./landingPage');

describe("LandingPageController", () => {
  const landingPageController = new LandingPageController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(landingPageController).toBeInstanceOf(BaseController);
  });

})