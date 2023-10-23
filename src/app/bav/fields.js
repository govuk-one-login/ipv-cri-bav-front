module.exports = {
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ]
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ]
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ]
  },
};
