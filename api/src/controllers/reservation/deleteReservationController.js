"use strict";
var deleteParty = require("../../domain/deleteParty");
var partyIDvalidator = require("../../resources/idValidator");
var partyValidator = require("../../resources/deletePartyValidator");
const msg = "party was deleted successfully!";

module.exports.deleteReservationController = async (req, res, next) => {
  let validation = await partyIDvalidator.execute(req, res);
  if (validation.errors.length) {
    log.critical(validation.errors);
    return res.status(404).json(validation.errors);
  }

  let validationParty = await partyValidator.execute(req, res);
  if (validationParty.errors.length) {
    log.critical(validationParty.errors);
    return res.status(404).json(validationParty.errors);
  }

  try {
    await deleteParty.execute(req, res, next);
    log.info("party: " + req.body._id + " was deleted successfully! ");
    return res.status(200).json(msg);
  } catch (error) {
    log.critical(error);
    return res.status(404).json(error.message);
  }
};
