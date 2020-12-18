"use strict";

const mongoose = require("mongoose");

const party_statuses = mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("party_statuses", party_statuses);
