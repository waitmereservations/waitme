"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var idSchema = {
    id: "idJson",
    type: "object",
    properties: {
      _id: { type: "string", minLength: 24, maxLength: 24 },
    },
    required: ["_id"],
  };

  return v.validate(req.body, idSchema);
};
