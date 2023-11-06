const reqres = require("reqres");

const JourneyModel = require("hmpo-form-wizard/lib/journey-model");
const WizardModel = require("hmpo-form-wizard/lib/wizard-model.js");

function setupDefaultMocks () {
  const req = reqres.req({
    form: { values: {} },
    axios: {
      get: jest.fn(),
      post: jest.fn(),
    },
  });

  req.journeyModel = new JourneyModel(null, {
    req,
    key: "test",
  });
  req.sessionModel = new WizardModel(null, {
    req,
    key: "test",
    journeyModel: req.journeyModel,
    fields: {},
  });

  const res = reqres.res({});

  const next = jest.fn();

  return {
    req,
    res,
    next,
  };
};

module.exports = { setupDefaultMocks };
