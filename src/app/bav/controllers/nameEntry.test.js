const BaseController = require("hmpo-form-wizard").Controller;
const NameEntryController = require('./nameEntry');

describe("NameEntryController", () => {
  const nameEntryController = new NameEntryController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(nameEntryController).toBeInstanceOf(BaseController);
  });

})