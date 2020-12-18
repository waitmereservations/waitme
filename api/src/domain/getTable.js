"use strict";

const mongoose = require("mongoose");
var tableModel = require("../model/tables.js");

module.exports.execute = async (req, res) => {
  let query = {};

  const tables = await tableModel
    .find(query)
    .populate({
      path: "party",
      populate: [
        {
          path: "party_status",
        },
        {
          path: "party_type",
        },
      ],
    })
    .populate("table_statuses");
  if (!tables) {
    throw new ObjectNotFoundError(
      "Partys not found.",
      400,
      "Object Not Found"
    );
  }
  return tables;
};
