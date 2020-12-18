"use strict";

const mongoose = require("mongoose");
var partyModel = require("../model/party.js");
var party_types = require("../model/party_types.js");
var party_statuses = require("../model/party_statuses.js");

module.exports.execute = async (req, res) => {
  let party_type = null;
  let party_status = null;
  let query = {};
  if (req.headers.party_type) {
    try {
      party_type = await party_types.findOne({
        name: req.headers.party_type,
      });
      query.party_type = party_type;
      if (!party_type) {
        throw new ObjectNotFoundError(
          "Party Type not found.",
          400,
          "Object Not Found"
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  if (req.headers.party_status) {
    try {
      party_status = await party_statuses.findOne({
        name: req.headers.party_status,
      });
      query.party_status = party_status;
      if (!party_status) {
        throw new ObjectNotFoundError(
          "Party Status not found.",
          400,
          "Object Not Found"
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const partys = await partyModel
    .find(query)
    .where("table").ne(null)
    .populate({
      path: "table",
      populate: [
        {
          path: "table_status",
        },
      ],
    })
    .populate('party_status','name')
    .populate('party_type','name');
  if (!partys) {
    throw new ObjectNotFoundError(
      "Partys not found.",
      400,
      "Object Not Found"
    );
  }
  return partys;
};
