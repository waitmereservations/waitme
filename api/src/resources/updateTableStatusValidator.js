"use strict";

var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports.execute = async (req, res) => {
  var tableSchema = {
    id: "tableJson",
    type: "object",
    properties: {
      _id: { type: "string", minLength: 24, maxLength: 24 },  
      table_number: { type: "String" },
      table_status: { type: "String" },
    },
    required: ["_id","table_number","table_status"],
  };

  return v.validate(req.body, tableSchema);
};
