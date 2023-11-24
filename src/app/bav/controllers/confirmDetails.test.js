const BaseController = require("hmpo-form-wizard").Controller;
const ConfirmDetailsController = require('./confirmDetails');

describe("AccountDetailsController", () => {
  const confirmDetailsController = new ConfirmDetailsController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(confirmDetailsController).toBeInstanceOf(BaseController);
  });

})