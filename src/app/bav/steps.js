const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const cannotProceed = require("./controllers/cannotProceed");
const confirmDetails = require("./controllers/confirmDetails");
const abort = require("./controllers/abort");
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
    editable: true,
    editBackStep: APP.PATHS.CONFIRM_DETAILS,
    next: APP.PATHS.CONFIRM_DETAILS,
  },
  [`${APP.PATHS.CONFIRM_DETAILS}`]: {
    controller: confirmDetails,
    fields: ["retryCount"],
    next: [
      {
        field: "retryCount",
        value: 0,
        next: APP.PATHS.DONE,
      },
      {
        field: "retryCount",
        value: 1,
        next: APP.PATHS.COULD_NOT_MATCH,
      },
      {
        field: "retryCount",
        value: 2,
        next: APP.PATHS.FAIL,
      },
    ],
  },
  [`${APP.PATHS.CANNOT_PROCEED}`]: {
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
            next: APP.PATHS.CONFIRM_DETAILS,
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
        next: APP.PATHS.ACCOUNT_DETAILS,
      },
      {
        field: "couldNotMatchChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.ABORT,
      },
    ],
  },
  [`${APP.PATHS.ABORT}`]: {
    entryPoint: true,
    skip: true,
    controller: abort,
  },
  [`${APP.PATHS.ERROR}`]: {
    entryPoint: true,
  },
};
