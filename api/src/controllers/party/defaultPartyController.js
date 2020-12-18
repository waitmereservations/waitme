"use strict";

const mongoose = require("mongoose");
var getParty = require("../../domain/getParty");
var partyValidator = require("../../resources/getPartyValidator");

module.exports.defaultPartyController = async (req, res) => {
  try {
    let parties = await getParty.execute(req, res);
    res.status(200).json(parties);
  } catch (error) {
    log.critical(error);
    res.status(404).json(error.message);
  }
};
