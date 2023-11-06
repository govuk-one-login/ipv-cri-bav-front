const BaseController = require("hmpo-form-wizard").Controller;
const AbortController = require('./abort');
const {setupDefaultMocks} = require('../../../../test/utils/test-helpers')
const {
 API: {
   PATHS: { ABORT },
 }
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

   abortController = new AbortController({ route: '/abort' });
 });

 it("should be an instance of BaseController", () => {
   expect(abortController).toBeInstanceOf(BaseController);
 });

 describe("#abortJourney", () => {
    it("should call abort endpoint successfully", async () => {
      req.axios.post = jest.fn().mockResolvedValue();

      await abortController.saveValues(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.axios.post).toHaveBeenCalledWith(
        ABORT,
        { reason: "session_expired" },
        {
          headers: {
            "x-govuk-signin-session-id": req.session.tokenId
          },
        }
      );
    });

    it("should handle Axios failure and call 'next' with the error", async () => {
      const error = new Error("Axios request failed");
      req.axios.post = jest.fn().mockRejectedValue(error);

      await abortController.saveValues(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
