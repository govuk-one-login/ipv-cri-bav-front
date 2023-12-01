const BaseController = require("hmpo-form-wizard").Controller;
const RootController = require("./root.js");
const { setupDefaultMocks } = require("../../../../test/utils/test-helpers.js");

describe("RootController", () => {
  const rootController = new RootController({ route: "/test" });
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be an instance of BaseController", () => {
    expect(rootController).toBeInstanceOf(BaseController);
  });

  // Pending introduction of lambda to bring shared claims name values in from IPV
  
  // describe("saveValues", () => {


    // it("should save all values to sessionModel with full shared_claims object", async () => {
     
    //   req.session.shared_claims = {
    //     name: [
    //       {
    //         nameParts: [
    //           { value: "First" },
    //           { value: "Middle" },
    //           { value: "Last" }
    //         ]
    //       }]
    //   };

    //   await rootController.saveValues(req, res, next);
    //   const firstName = req.sessionModel.get("firstName");
    //   const surname = req.sessionModel.get("surname");

    //   expect(firstName).toEqual("First");
    //   expect(surname).toEqual("Last");
    // });
  // });

  it("should not update sessionModel if no shared_claims attributes present", async () => {
    req.session.shared_claims = {
      name: [],
    };

    await rootController.saveValues(req, res, next);
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");

    expect(firstName).toEqual(undefined);
    expect(surname).toEqual(undefined);
  });
});
