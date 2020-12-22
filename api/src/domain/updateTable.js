"use strict";

const mongoose = require("mongoose");
var tables = require("../model/tables.js");

module.exports.execute = async (req, res) => {
  let updatedTable;

  try {
    /*
    updatedTable = await tables.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      req.body
    );
    if (updatedTable.n != 1) {
      throw new PartyError(
        "Unable to update table: " + JSON.stringify(req.body),
        400,
        "UpdateTableError"
      );
    }
    */
  } catch (error) {
    throw new Error(error);
  }

  return updatedTable;
};
