const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const users = {
  "A user": {},
  "Erroring Ethem": {},
  "Not Authenticatable Neil": {},
  "Validating Valerie": {},
};

class CustomWorld {
  constructor() {
    this.allUsers = users;
  }
}

setWorldConstructor(CustomWorld);
