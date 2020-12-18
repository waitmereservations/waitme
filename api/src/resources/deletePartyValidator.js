"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var tableSchema = {
    id: "tableJson",
    type: "object",
    properties: {
      _id: { type: "string", minLength: 24, maxLength: 24 },
      party_type: {
        type: "string",
        enum: ["walkin", "party", "waitlist"],
      },
    },
    required: ["_id", "party_type"],
  };

  return v.validate(req.body, tableSchema);
};
