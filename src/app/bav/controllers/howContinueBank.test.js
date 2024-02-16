const BaseController = require("hmpo-form-wizard").Controller;
const HowContinueBankController = require("./howContinueBank");

describe("HowContinueBankController", () => {
  const howContinueBankController = new HowContinueBankController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(howContinueBankController).toBeInstanceOf(BaseController);
  });
});
