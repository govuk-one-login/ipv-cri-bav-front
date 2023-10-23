const nameEntry = require("./controllers/nameEntry");
const root = require("./controllers/root");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "enter-name-photo-id",
  },
  "/enter-name-photo-id": {
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry
  }
};
