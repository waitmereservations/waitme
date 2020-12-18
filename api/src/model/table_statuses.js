"use strict";

const mongoose = require("mongoose");

const table_statuses = mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("table_statuses", table_statuses);
