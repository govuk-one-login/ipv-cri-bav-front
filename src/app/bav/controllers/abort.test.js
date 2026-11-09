const BaseController = require("hmpo-form-wizard").Controller;
const AbortController = require("./abort");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers");
const {
  API: {
    PATHS: { ABORT },
  },
} = require("../../../lib/config");

describe("AbortController", () => {
  let abortController;
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    abortController = new AbortController({ route: "/abort" });
  });

  it("should be an instance of BaseController", () => {
    expect(abortController).toBeInstanceOf(BaseController);
  });

  describe("#abortJourney", () => {
    it("should call abort endpoint successfully", async () => {
      await abortController.saveValues(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.customFetch).toHaveBeenCalledWith(
        ABORT,
        { method: "POST",
          headers: {
            "txma-audit-encoded": "dummy-txma-header",
            "x-govuk-signin-session-id": req.session.tokenId,
          },
          body: JSON.stringify({ reason: "session_expired" }) },
      );
    });

    it("should handle Axios failure and call 'next' with the error", async () => {
      const error = new Error("Axios request failed");
      req.customFetch = jest.fn().mockRejectedValue(error);

      await abortController.saveValues(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
