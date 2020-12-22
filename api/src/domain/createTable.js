"use strict";

const mongoose = require("mongoose");
var tablesModel = require("../model/tables.js");

module.exports.execute = async (req, res) => {
  let updateTable;
  const tables = await tablesModel.findOne({
    table_number: req.body.table_number,
  });

  if (tables) {
    throw new ObjectNotFoundError(
      "Table number already exists",
      400,
      "RedudantError"
    );
  } else {
    try {
      req.body.party = null;
      req.body.table_statuses = null;
      const newTable = new tablesModel(req.body);
      //updateTable = await newTable.save();
      updateTable = false
      if (!updateTable) {
        throw new PartyError(
          "Table not saved. " + JSON.stringify(req.body),
          500,
          "InternalServerError"
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return updateTable;
};
