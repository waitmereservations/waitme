"use strict";
var updateTable = require("../../domain/updateTable");
var validator = require("../../resources/tableValidator");
var idValidator = require("../../resources/idValidator");

module.exports.updateTableController = async (req, res, next) => {
  let idValidation = await idValidator.execute(req, res);
  if (idValidation.errors.length) {
    log.critical(idValidation.errors);
    return res.status(404).json(idValidation.errors);
  }

  let validationTable = await validator.execute(req, res);
  if (validationTable.errors.length) {
    log.critical(validationTable.errors);
    return res.status(404).json(validationTable.errors);
  }

  try {
    let tableObj = await updateTable.execute(req, res, next);
    log.info(`new party was updated successfully!`);
    res.status(200).json(tableObj);
  } catch (error) {
    log.critical(error);
    res.status(404).json(error.message);
  }
};
