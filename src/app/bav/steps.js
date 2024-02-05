const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const cannotProceed = require("./controllers/cannotProceed");
const checkDetails = require("./controllers/checkDetails");
const abort = require("./controllers/abort");
const nameInfo = require("./controllers/nameInfo");
const { APP } = require("../../lib/config");

module.exports = {
  [`${APP.PATHS.BAV}`]: {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: APP.PATHS.NAME_INFO,
  },
  [APP.PATHS.NAME_INFO]: {
    entryPoint: true,
    skip: true,
    controller: nameInfo,
    next: APP.PATHS.LANDING_PAGE,
  },
  [APP.PATHS.LANDING_PAGE]: {
    controller: landingPage,
    next: APP.PATHS.ACCOUNT_DETAILS,
  },
  [APP.PATHS.ACCOUNT_DETAILS]: {
    fields: ["sortCode", "accountNumber"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.CHECK_DETAILS,
  },
  [APP.PATHS.CHECK_DETAILS]: {
    controller: checkDetails,
    fields: ["attemptCount"],
    next: [
      {
        field: "attemptCount",
        value: undefined,
        next: APP.PATHS.DONE,
      },
      {
        field: "attemptCount",
        value: 1,
        next: APP.PATHS.COULD_NOT_MATCH,
      },
      {
        field: "attemptCount",
        value: 2,
        next: APP.PATHS.DONE,
      },
    ],
  },
  [APP.PATHS.CANNOT_PROCEED]: {
    controller: cannotProceed,
    fields: ["cannotProceedChoice"],
    checkJourney: false,
    next: [
      {
        field: "cannotProceedChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.ABORT,
      },
      {
        field: "cannotProceedChoice",
        value: "goBack",
        next: [
          {
            field: "isLanding",
            value: true,
            next: APP.PATHS.LANDING_PAGE,
          },
          {
            field: "isLanding",
            value: false,
            next: APP.PATHS.CHECK_DETAILS,
          },
        ],
      },
    ],
  },
  [`${APP.PATHS.COULD_NOT_MATCH}`]: {
    fields: ["couldNotMatchChoice"],
    checkJourney: false,
    next: [
      {
        field: "couldNotMatchChoice",
        value: "tryAgain",
        next: APP.PATHS.CHECK_DETAILS,
      },
      {
        field: "couldNotMatchChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.ABORT,
      },
    ],
  },
  [`${APP.PATHS.DONE}`]: {
    skip: true,
    noPost: true,
    next: APP.PATHS.OAUTH2,
  },
  [`${APP.PATHS.ABORT}`]: {
    entryPoint: true,
    skip: true,
    controller: abort,
  },
  [APP.PATHS.DONE]: {
    skip: true,
    noPost: true,
    next: APP.PATHS.OAUTH2,
  },
  [APP.PATHS.ERROR]: {
    entryPoint: true,
  },
};
