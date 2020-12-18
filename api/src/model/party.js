"use strict";

const mongoose = require("mongoose");

const partySchema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email_address: { type: String },
    phone_number: { type: String },
    quote_time: { type: Number },
    date_created: { type: Date, default: Date.now },
    party_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "party_types",
    },
    party_size: { type: Number },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tables",
    },
    party_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "party_statuses",
    },
    reservation_time: { type: String }, 
    reservation_confirmed: { type: Boolean }
  },
  { timestamps: true }
);

module.exports = mongoose.model("parties", partySchema);
