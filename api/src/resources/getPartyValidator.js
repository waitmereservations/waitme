"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var partySchema = {
    id: "partyJson",
    type: "object",
    properties: {
      reservation_type: {
        type: "string",
        enum: ["walkin", "reservation", "waitlist"],
      },
      party_status: {
        type: "string",
        enum: ["upcoming", "seated", "left"],
      },
    },
    required: [],
  };

  return v.validate(req.headers, partySchema);
};
