"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var partySchema = {
    id: "partyJson",
    type: "object",
    properties: {
      first_name: { type: "string", minLength: 1, maxLength: 50 },
      last_name: { type: "string", minLength: 1, maxLength: 50 },
      email_address: { type: "string", format: "email" },
      date_created: { type: "string", format: "date-time" },
      phone_number: {
        type: "string",
        minLength: 10,
        maxLength: 10,
        pattern: "^[0-9]*$",
      },
      party_type: { const: "reservation" },
      party_status: {
        type: "string",
        enum: ["upcoming", "seated", "left"],
      },
      party_size: { type: "string" },
      table_number: { type: "string" },
      reservation_time: { type: "string" },
      reservation_confirmed: { type: "boolean" }
    },
    required: ["party_type", "party_status", "table_number"],
  };

  return v.validate(req.body, partySchema);
};
