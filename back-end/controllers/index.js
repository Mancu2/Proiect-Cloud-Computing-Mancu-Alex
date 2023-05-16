const user = require("./user");
const note = require("./note");
const subject = require("./subject");
const group = require("./group");
const other = require("./other");

const controllers = {
  user,
  note,
  subject,
  group,
  other,
};

module.exports = controllers;
