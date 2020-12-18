"use strict";

const mongoose = require("mongoose");
var getTableStatus = require("../../domain/getTableStatus");

module.exports.defaultTableStatusController = async (req, res) => {
  try {
    let tables = await getTableStatus.execute(req, res);
    res.status(200).json(tables);
  } catch (error) {
    log.critical(error);
    res.status(404).json(error.message);
  }
};
