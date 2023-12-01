const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const accountDetails = require("./controllers/accountDetails");
const escapeJourney = require("./controllers/escapeJourney");
const { APP } = require("../../lib/config");

module.exports = {
  [`${APP.PATHS.BAV}`]: {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: APP.PATHS.LANDING_PAGE,
  },
  [`${APP.PATHS.LANDING_PAGE}`]: {
    controller: landingPage,
    next: APP.PATHS.ACCOUNT_DETAILS,
  },
  [`${APP.PATHS.ACCOUNT_DETAILS}`]: {
    fields: ["sortCode", "accountNumber"],
    controller: accountDetails,
    checkJourney: false,
    next: APP.PATHS.CANNOT_PROCEED
  },
  [`${APP.PATHS.CANNOT_PROCEED}`]: {
    fields: ["escapeChoice"],
    controller: escapeJourney,
    checkJourney: false,
    next: [
      {
        field: "escapeChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.LANDING_PAGE
      },
      {
        field: "escapeChoice",
        value: "goBack",
        next: [{
          fn: (req) => req.sessionModel.get("isLanding"), next: APP.PATHS.LANDING_PAGE },
              APP.PATHS.ACCOUNT_DETAILS
    ]}
    ]
  },
};
