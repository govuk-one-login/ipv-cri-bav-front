const nameEntry = require("./controllers/nameEntry");
const root = require("./controllers/root");
const { APP } = require("../../lib/config");

module.exports = {
  [`${APP.PATHS.BAV}`]: {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: APP.PATHS.NAME_ENTRY,
  },
  [`${APP.PATHS.NAME_ENTRY}`]: {
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry
  }
};
