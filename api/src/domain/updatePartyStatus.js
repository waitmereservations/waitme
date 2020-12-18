"use strict";

const mongoose = require("mongoose");
var partyModel = require("../model/party.js");
var table_party_log = require("../model/party_table_log.js");
var party_status = require("../model/party_statuses.js");

module.exports.execute = async (req, res) => {
    let log = new table_party_log();
    let updatedParty;

    const partyPassedStatus = await party_status.findOne({
        name: req.body.party_status,
    });

    let party = await partyModel.findOne({
        _id: req.body._id,
    });
    if (!party) {
        throw new ObjectNotFoundError(
            "Party not found",
            400,
            "Object Not Found"
        );
    }

    if (req.body.party_status === "left"){
        party.table = null;
    }
    party.party_status = partyPassedStatus;
    try {
        updatedParty = await party.save();
        if (!updatedParty) {
            throw new PartyError(
                "Unable to update Partys. " + JSON.stringify(req.body),
                500,
                "UpdatePartyError"
            );
        }

        log.party = party;
        log.action = "Status change for Party: " + party.first_name + " to " + partyPassedStatus.name
        await log.save();

    } catch (error) {
        throw new Error(error);
    }    

    return updatedParty;
}    