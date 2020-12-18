"use strict";

const mongoose = require("mongoose");
var partyModel = require("../model/party.js");
var tablesModel = require("../model/tables.js");
var table_party_log = require("../model/party_table_log.js");
var table_status = require("../model/table_statuses.js");
var party_statuses = require("../model/party_statuses.js");

module.exports.execute = async (req, res) => {
  let log = new table_party_log();
  let updatedParty;
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

  if (req.body.table_status === "left") {
    req.body.party_status = "left";
  }

  const partyStatus = await party_statuses.findOne({
    name: req.body.party_status,
  });
  if (!partyStatus) {
    throw new ObjectNotFoundError(
      "Party Status not found.",
      400,
      "InternalServerError"
    );
  }

  let party = await partyModel.findOne({
    _id: req.body._id,
  });
  if (!party) {
    throw new ObjectNotFoundError(
      "Party not found.",
      400,
      "Object Not Found"
    );
  }


  tables.table_status = tableStatus;
  if (req.body.table_status === "left") {
    tables.table_status = null;
    party.table = null;
  }

  try {
    party.party_status = partyStatus;
    updatedParty = await party.save();
    if (!updatedParty) {
      throw new PartyError(
        "Unable to update Partys. " + JSON.stringify(req.body),
        500,
        "UpdatePartyError"
      );
    }

    tableParty = await tables.save();
    if (!tableParty) {
      throw new PartyError(
        "Unable to save Table Partys. " + JSON.stringify(req.body),
        500,
        "UpdateTablePartyError"
      );
    }

    log.party_table = tables;
    log.party = party;
    log.table_statuses = tableStatus;
    log.action = "Status change for table: " + tables.table_number + " to " + tableStatus.name
    await log.save();
  } catch (error) {
    throw new Error(error);
  }
  return tableParty;
};
