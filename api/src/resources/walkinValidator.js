"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var walkinSchema = {
    id: "partyJson",
    type: "object",
    properties: {
      table_number: { type: "String" },
      party_type: { const: "walkin" },
      party_status: {
        type: "string",
        enum: ["upcoming", "seated", "left"],
      },
      party_size: { type: "integer" },
    },
    required: [
      "party_type",
      "table_number",
      "party_size",
      "party_status",
    ],
  };

  return v.validate(req.body, walkinSchema);
};
