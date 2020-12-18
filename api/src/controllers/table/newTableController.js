"use strict";
var createNewTable = require("../../domain/createTable");
var validator = require("../../resources/tableValidator");

module.exports.newTableController = async (req, res, next) => {
  let validation = await validator.execute(req, res);
  if (Array.isArray(validation.errors) && !validation.errors.length) {
    try {
      let newTable = await createNewTable.execute(req, res, next);
      log.info(`new party was created successfully!`);
      res.status(200).json(newTable);
    } catch (error) {
      log.critical(error);
      res.status(404).json(error.message);
    }
  } else {
    log.critical(validation.errors);
    return res.status(404).json(validation.errors);
  }
};
