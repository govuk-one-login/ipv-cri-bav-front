const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const userClaims = {
  "a user": require("../support/shared_claim"),
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
