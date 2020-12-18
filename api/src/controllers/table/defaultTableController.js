"use strict";

const mongoose = require("mongoose");
var getTable = require("../../domain/getTable");

module.exports.defaultTableController = async (req, res) => {
  try {
    let tables = await getTable.execute(req, res);
    res.status(200).json(tables);
  } catch (error) {
    log.critical(error);
    res.status(404).json(error.message);
  }
};
