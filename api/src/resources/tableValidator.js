"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var tableSchema = {
    id: "tableJson",
    type: "object",
    properties: {
      table_number: { type: "String" },
      capacity: { type: "integer" },
    },
    required: ["table_number"],
  };

  return v.validate(req.body, tableSchema);
};
