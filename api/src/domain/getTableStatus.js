"use strict";

const mongoose = require("mongoose");
var tableStatusModel = require("../model/table_statuses.js");

module.exports.execute = async (req, res) => {
  let query = {};

  const tableStatus = await tableStatusModel
    .find(query);
  if (!tableStatus) {
    throw new ObjectNotFoundError(
      "Partys not found.",
      400,
      "Object Not Found"
    );
  }
  return tableStatus;
};
