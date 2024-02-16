const BaseController = require("hmpo-form-wizard").Controller;
const RootController = require("./root.js");

describe("RootController", () => {
  const rootController = new RootController({ route: "/test" });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be an instance of BaseController", () => {
    expect(rootController).toBeInstanceOf(BaseController);
  });
});
