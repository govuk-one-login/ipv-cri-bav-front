const BaseController = require("hmpo-form-wizard").Controller;
const AccountDetailsController = require("./accountDetails");

describe("AccountDetailsController", () => {
  const accountDetailsController = new AccountDetailsController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(accountDetailsController).toBeInstanceOf(BaseController);
  });
});
