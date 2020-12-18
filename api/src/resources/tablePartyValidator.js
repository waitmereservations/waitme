"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var tablePartySchema = {
    id: "partyJson",
    type: "object",
    properties: {
      party_status: {
        type: "string",
        enum: ["upcoming", "seated", "left"],
      },
      table_status: {
        type: "string",
        enum: ["seated", "appetizer", "entree", "dessert", "bill", "left"],
      },
      table_number: { type: "String" },
    },
    required: ["party_status", "table_status", "table_number"],
  };

  return v.validate(req.body, tablePartySchema);
};
