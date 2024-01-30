const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const userClaims = {
  "a user": require("../support/shared_claim"),
  "a user named Nigel": require("../support/shared_claim_nigel"),
  "Erroring Ethem": {},
  "Not Authenticatable Neil": {},
  "Validating Valerie": {},
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
