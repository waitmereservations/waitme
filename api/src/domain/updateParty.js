"use strict";

const mongoose = require("mongoose");
var party = require("../model/party.js");
var party_types = require("../model/party_types.js");
var party_statuses = require("../model/party_statuses.js");

module.exports.execute = async (req, res) => {
  let partyObj = new party();
  try {
    req.body.party_type = await party_types.findOne({
      name: req.body.party_type,
    });
    if (!req.body.party_type) {
      throw new ObjectNotFoundError(
        "Party Type not found.",
        400,
        "Object Not Found"
      );
    }
  } catch (error) {
    throw new Error(error);
  }

  try {
    req.body.party_status = await party_statuses.findOne({
      name: req.body.party_status,
    });
    if (!req.body.party_status) {
      throw new ObjectNotFoundError(
        "Party Status not found.",
        400,
        "Object Not Found"
      );
    }
  } catch (error) {
    throw new Error(error);
  }

  try {
    partyObj = await party.updateOne(
      {
        _id: req.body._id
      },
      req.body
    );
    if (partyObj.n != 1) {
      throw new ObjectNotFoundError(
        "Party/WaitList not found. " + JSON.stringify(req.body),
        400,
        "Object Not Found"
      );
    }
  } catch (error) {
    throw new Error(error);
  }

  return partyObj;
};
