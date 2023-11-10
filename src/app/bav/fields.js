module.exports = {
  sortCode: {
    type: "number",
    journeyKey: "sortCode",
    validate: [
      "required",
      // Subject to change, potential to allow dashes ("-") etc
      { type: "exactlength", arguments: [6] },
    ]
  },
  accountNumber: {
    type: "number",
    journeyKey: "accountNumber",
    validate: [
      "required",
      { type: "minlength", arguments: [6] },
      { type: "maxlength", arguments: [8] },
    ] 
  }
};
