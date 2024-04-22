module.exports = {
  sortCode: {
    type: "text",
    inputMode: "numeric",
    journeyKey: "sortCode",
    validate: [
      "required",
      {
        type: "length",
        fn: (value) => value.match(/^(?=(?:\D*\d){6}\D*$|.{6}$)/)
      },
      {
        type: "regexNumber",
        fn: (value) =>
          value.match(/^\d{6}$|^\d{2}-\d{2}-\d{2}$|^\d{2} \d{2} \d{2}$/),
      },
    ],
  },
  accountNumber: {
    type: "text",
    inputMode: "numeric",
    journeyKey: "accountNumber",
    validate: [
      "required",
      {
        type: "numsOnly",
        fn: (value) => value.match(/^\d+$/),
      },
      { type: "minlength", arguments: [6] },
      { type: "maxlength", arguments: [8] },
    ],
  },
  howContinueBankChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: "proveAnotherWay",
        conditional: {
          html: "",
        },
      },
      {
        value: "goBack",
        conditional: {
          html: "",
        },
      },
    ],
    validate: ["required"],
  },
  couldNotMatchChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: "tryAgain",
        conditional: {
          html: "",
        },
      },
      {
        value: "proveAnotherWay",
        conditional: {
          html: "",
        },
      },
    ],
    validate: ["required"],
  },
};
