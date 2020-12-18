"use strict";

const mongoose = require("mongoose");

const tables = mongoose.Schema(
  {
    table_number: { type: String },
    capacity: { type: Number },
    table_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table_statuses",
    },
    parties: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parties",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tables", tables);
