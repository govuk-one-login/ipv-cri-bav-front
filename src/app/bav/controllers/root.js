const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {

  //Below code is in anticipation of design changing to a single given name field
    
  //   const sharedClaims = req.session?.shared_claims;
  //   const entries = sharedClaims.name[0].nameParts

  //   const getFullName = () => {
  //     let nameParts = []
  //     for(const entry of entries) {
  //       nameParts.push(entry.value)
  //     }
  //     const fullName = nameParts.join(" ")
  //     req.sessionModel.set("fullName", fullName)
  //   }

  //   getFullName()
  // }

  
  const sharedClaims = req.session?.payload.shared_claims;

    if (sharedClaims && sharedClaims?.name?.length > 0) {
        let names = sharedClaims.name[0].nameParts
        console.log("------", names[0].value)
        console.log("------", names[names.length-2].value)
        console.log("------", names[names.length-1].value)
        req.sessionModel.set("firstName", names[0].value);
        req.sessionModel.set("middleName", names[names.length-2].value);
        req.sessionModel.set("lastName", names[names.length-1].value);
    }
    
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;