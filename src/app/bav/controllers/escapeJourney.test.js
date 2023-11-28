const BaseController = require("hmpo-form-wizard").Controller;
const EscapeJourneyController = require("./escapeJourney");

describe("EscapeJourneyController", () => {
  const escapeJourneyController = new EscapeJourneyController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(escapeJourneyController).toBeInstanceOf(BaseController);
  });
});
