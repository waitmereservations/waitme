"use strict";

const mongoose = require("mongoose");
var party = require("../model/party.js");
var table_party_log = require("../model/party_table_log.js");
var party_types = require("../model/party_types.js");

module.exports.execute = async (req, res) => {
  let log = new table_party_log();
  let deletedParty;

  const tableQry = {
    name: req.body.party_type,
  };

  try {
    let deletedParty = await party.deleteOne({
      _id: req.body._id,
      party_type: await party_types.findOne(tableQry),
    });

    if (deletedParty.n != 1) {
      throw new PartyError(
        "Unable to delete Party. Check party type" +
          JSON.stringify(req.body),
        400,
        "DeletePartyError"
      );
    }

    log.party = req.body._id;
    log.deleted = 1;
    await log.save();
  } catch (error) {
    throw new Error(error);
  }

  return deletedParty;
};
