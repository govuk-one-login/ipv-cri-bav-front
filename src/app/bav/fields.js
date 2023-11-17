module.exports = {
  sortCode: {
    type: "text",
    journeyKey: "sortCode",
    validate: [
      "required",
      {
        type: "regexNumber",
        fn: (value) =>
          value.match(/^\d{6}$|^\d{2}-\d{2}-\d{2}$|^\d{2} \d{2} \d{2}$/),
      },
    ],
  },
  accountNumber: {
    type: "number",

    journeyKey: "accountNumber",
    validate: [
      "required",
      { type: "minlength", arguments: [6] },
      { type: "maxlength", arguments: [8] },
    ],
  },
};