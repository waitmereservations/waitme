"use strict";

const mongoose              = require("mongoose");
var partyModel              = require("../model/party.js");
var tablesModel             = require("../model/tables.js");
var table_party_log         = require("../model/party_table_log.js");

module.exports.execute = async (req, res) => {
  let log = new table_party_log();
  let updatedParty;
  let updatedTable;
  let updatedPrevTable;

  const tables = await tablesModel.findOne({
    table_number: req.body.table_number,
  });
  if (!tables) {
    throw new ObjectNotFoundError("Table not found.", 400, "Object Not Found");
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
  
  //table(non reservation or waitlist) is already filled with a party
  if (tables.parties && tables.parties != req.body._id) {
    if (req.body.table_number != 'waitlist' && req.body.table_number != 'reservation') {
      throw new PartyError(
        "Can't update existing table party with a different party ",
        404,
        "TablePartyError"
      );
    }
  }

  //req.body.table_number is destination table number
  // set previous party.table to null, if party goes to reservation or waitlist queue
  //if (req.body.table_number === 'waitlist' || req.body.table_number === 'reservation') {
    const prevTable = await tablesModel.findOne({
      _id: party.table,
    });
    if (prevTable){
      prevTable.parties = null;
      try {
        updatedPrevTable = await prevTable.save();
        if (!updatedPrevTable) {
          throw new PartyError(
            "Unable to update party previous table to null. " + JSON.stringify(req.body),
            500,
            "UpdatePartyError"
          );
        }
      }
      catch (error) {
        throw new Error(error);
      }
    }
  //}  

  try {
    tables.parties = party;
    updatedTable = await tables.save();

    if (!updatedTable) {
      throw new PartyError(
        "Unable to save Table Partys. " + JSON.stringify(req.body),
        500,
        "UpdateTablePartyError"
      );
    }

    const tableUpdated = await tablesModel.findOne({
      table_number: updatedTable.table_number,
    });
    if (!tables) {
      throw new ObjectNotFoundError("Table not found.", 400, "Object Not Found");
    }
    
    party.table = tableUpdated;
    updatedParty = await party.save();
    if (!updatedParty) {
      throw new PartyError(
        "Unable to update Partys. " + JSON.stringify(req.body),
        500,
        "UpdatePartyError"
      );
    }

    log.party_table = tables;
    log.party = party;
    log.action = "Party: " + party.first_name + " asign to table: " + tables.table_number
    await log.save();
    
  } catch (error) {
    throw new Error(error);
  }
  
  return updatedTable;
};
