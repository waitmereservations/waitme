"use strict";
var asignPartyToTable = require("../../domain/asignPartyToTable");
var validator = require("../../resources/tableValidator");
var idValidator = require("../../resources/idValidator");

module.exports.asignPartyTableController = async (req, res, next) => {
  let IDValidationObj = await idValidator.execute(req, res);
  if (IDValidationObj.errors.length) {
    log.critical(IDValidationObj.errors);
    return res.status(404).json(IDValidationObj.errors);
  }

  let validationTable = await validator.execute(req, res);
  if (validationTable.errors.length) {
    log.critical(validationTable.errors);
    return res.status(404).json(validationTable.errors);
  }

  try {
    let update = await asignPartyToTable.execute(req, res, next);
    log.info(`reservation was updated successfully!`);
    return res.status(200).json(update);
  } catch (error) {
    log.critical(error);
    return res.status(404).json(error.message);
  }
};
