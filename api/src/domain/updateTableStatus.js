"use strict";

const mongoose = require("mongoose");
var partyModel = require("../model/party.js");
var tablesModel = require("../model/tables.js");
var table_party_log = require("../model/party_table_log.js");
var table_status = require("../model/table_statuses.js");
var updatePartyStatus = require("./updatePartyStatus.js");

module.exports.execute = async (req, res) => {
  let log = new table_party_log();
  let tableParty;

  const tables = await tablesModel.findOne({
    table_number: req.body.table_number,
  });
  if (!tables) {
    throw new ObjectNotFoundError("Table not found.", 400, "Object Not Found");
  }

  let tableStatus = await table_status.findOne({
    name: req.body.table_status,
  });
  if (!tableStatus) {
    throw new ObjectNotFoundError(
      "Table Status not found.",
      400,
      "Object Not Found"
    );
  }

  tables.table_status = tableStatus;
  //only if table_status is left, do we update party status to left, and set party.table to null
  if (req.body.table_status === "left") {
    tables.table_status = null;
    tables.parties = null;
    req.body.party_status = "left";
    await updatePartyStatus.execute(req, res);
  }
  else if (req.body.table_status === "seated") {
    req.body.party_status = "seated";
    await updatePartyStatus.execute(req, res);
  }

  try {
    tableParty = await tables.save();
    if (!tableParty) {
      throw new PartyError(
        "Unable to save Table Partys. " + JSON.stringify(req.body),
        500,
        "UpdateTablePartyError"
      );
    }

    log.party_table = tables;
    log.table_statuses = tableStatus;
    log.action = "Status change for table: " + tables.table_number + " to " + tableStatus.name
    await log.save();
  } catch (error) {
    throw new Error(error);
  }
  return tableParty;
};
