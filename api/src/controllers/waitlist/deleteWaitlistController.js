"use strict";
var deleteParty = require("../../domain/deleteParty");
var idValidator = require("../../resources/idValidator");
var deleteValidator = require("../../resources/deletePartyValidator");

const msg = "party was deleted successfully!";
module.exports.deleteWaitlistController = async (req, res, next) => {
  let validation = await idValidator.execute(req, res);

  if (validation.errors.length) {
    log.critical(validation.errors);
    return res.status(404).json(validation.errors);
  }

  let validationWaitlist = await deleteValidator.execute(req, res);
  if (validationWaitlist.errors.length) {
    log.critical(validationWaitlist.errors);
    return res.status(404).json(validationWaitlist.errors);
  }

  try {
    await deleteParty.execute(req, res, next);
    log.info("party was deleted successfully! " + req.body._id);
    return res.status(200).json(msg);
  } catch (error) {
    log.critical(error);
    return res.status(404).json(error.message);
  }
};
