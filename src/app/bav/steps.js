const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const accountDetails = require("./controllers/accountDetails");
const confirmDetails = require("./controllers/confirmDetails")
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
    editable: true,
    editBackStep: APP.PATHS.CONFIRM_DETAILS,
    next: APP.PATHS.CONFIRM_DETAILS,
  },
  [`${APP.PATHS.CONFIRM_DETAILS}`]: {
    controller: confirmDetails,
    next: APP.PATHS.DONE
  }
};
