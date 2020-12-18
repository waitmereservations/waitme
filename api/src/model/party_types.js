"use strict";

const mongoose = require("mongoose");

const party_types = mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("party_types", party_types);
