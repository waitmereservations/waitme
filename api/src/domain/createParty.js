"use strict";

const mongoose = require("mongoose");
var party = require("../model/party.js");
var party_types = require("../model/party_types.js");
var party_statuses = require("../model/party_statuses.js");
var asignPartyToTable = require("./asignPartyToTable");
var deleteParty = require("./deleteParty");

module.exports.execute = async (req, res) => {
  const newParty = new party(req.body);
  let partyObj;
  let update;

  req.body.first_name = 'readonlyf';
  req.body.last_name= 'readonlyl'; 
  req.body.email_address= 'readonly@readonly.com'; 
  req.body.phone_number= '1231231232';
  req.body.party_status= 'upcoming';
  req.body.party_size= '2';
  req.body.reservation_time= '10:00am';
  req.body.reservation_confirmed= false;
  req.body.quote_time= '5';

  try {
    newParty.party_status = await party_statuses.findOne({
      name: req.body.party_status,
    });
    if (!newParty.party_status) {
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
    newParty.party_type = await party_types.findOne({
      name: req.body.party_type,
    });
    if (!newParty.party_type) {
      throw new ObjectNotFoundError(
        "Party Type not found.",
        400,
        "Object Not Found"
      );
    }
  } catch (error) {
    throw new Error(error);
  }

  newParty.table = null;
  try {
    partyObj = await newParty.save();
    if (!partyObj) {
      throw new PartyError(
        "Partys not saved. " + JSON.stringify(req.body),
        500,
        "InternalServerError"
      );
    }
  } catch (error) {
    throw new Error(error);
  }
  
  req.body._id = partyObj._id;
  try {
    update = await asignPartyToTable.execute(req, res);
    if (!update) {
      throw new ObjectNotFoundError(
        "Unable to asign party to table",
        500,
        "Object Not Found"
      );
    }
  } catch (error) {
      deleteParty = await deleteParty.execute(req, res);
      throw new Error(error);
  }

  return partyObj;
};
