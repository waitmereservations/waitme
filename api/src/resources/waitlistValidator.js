"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var waitlistSchema = {
    id: "partyJson",
    type: "object",
    properties: {
      first_name: { type: "string", minLength: 1, maxLength: 50 },
      last_name: { type: "string", minLength: 1, maxLength: 50 },
      party_type: { const: "waitlist" },
      party_status: {
        type: "string",
        enum: ["upcoming", "seated", "left"],
      },
      date_created: { type: "string", format: "date-time" },
      party_size: { type: "string" },
      phone_number: {
        type: "string",
        minLength: 10,
        maxLength: 10,
        pattern: "^[0-9]*$",
      },
      quote_time: { type: "string" },
      table_number: { type: "string" },
    },
    required: [
      "first_name",
      "party_type",
      "party_size",
      "phone_number",
      "quote_time",
      "table_number",
    ],
  };

  return v.validate(req.body, waitlistSchema);
};
