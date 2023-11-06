const landingPage = require("./controllers/landingPage");
const root = require("./controllers/root");
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
    next: APP.PATHS.ACCOUNT_DETAILS
  }
};
