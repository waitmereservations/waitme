"use strict";
var updateTable = require("../../domain/updateTableStatus");
var validator = require("../../resources/updateTableStatusValidator");

module.exports.updateTableStatusController = async (req, res, next) => {
  let validation = await validator.execute(req, res);
  if (validation.errors.length) {
    log.critical(validation.errors);
    return res.status(404).json(validation.errors);
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
