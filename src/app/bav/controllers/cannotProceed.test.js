const BaseController = require("hmpo-form-wizard").Controller;
const CannotProceedController = require("./cannotProceed");

describe("CannotProceedController", () => {
  const cannotProceedController = new CannotProceedController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(cannotProceedController).toBeInstanceOf(BaseController);
  });
});
