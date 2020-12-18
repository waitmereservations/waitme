"use strict";

const mongoose = require("mongoose");

const table_party_log = mongoose.Schema(
  {
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parties",
    },
    party_table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tables",
    },
    table_statuses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table_statuses",
    },
    action: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("table_party_log", table_party_log);
