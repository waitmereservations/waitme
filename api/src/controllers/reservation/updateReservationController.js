"use strict";
var updateParty = require("../../domain/updateParty");
var validator = require("../../resources/reservationValidator");
var idValidator = require("../../resources/idValidator");

module.exports.updateReservationController = async (req, res, next) => {
  let IDValidationObj = await idValidator.execute(req, res);
  if (IDValidationObj.errors.length) {
    log.critical(IDValidationObj.errors);
    return res.status(404).json(IDValidationObj.errors);
  }

  let validationParty = await validator.execute(req, res);
  if (validationParty.errors.length) {
    log.critical(validationParty.errors);
    return res.status(404).json(validationParty.errors);
  }

  try {
    let update = await updateParty.execute(req, res, next);
    log.info(`party was updated successfully!`);
    return res.status(200).json(update);
  } catch (error) {
    log.critical(error);
    return res.status(404).json(error.message);
  }
};
