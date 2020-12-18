"use strict";

const mongoose = require("mongoose");
var getParty = require("../../domain/getParty");
var tables = require("../../model/tables.js");
var reservationValidator = require("../../resources/getPartyValidator");
module.exports.defaultReservationController = async (req, res) => {

/*
  try {
    let status = new reservation_status();
    status.name = "seated";
    await status.save();

    res.status(200).json(status);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }


  try {
    let table = new tables();
    table.table_number = '1';
    table.vacant = 1;
    table.capacity = 4;
    table.party = null;
    await table.save();

    let table2 = new tables();
    table2.table_number = '2';
    table2.vacant = 1;
    table2.capacity = 4;
    table2.party = null;
    await table2.save();

    let table3 = new tables();
    table3.table_number = '3';
    table3.vacant = 1;
    table3.capacity = 4;
    table3.party = null;
    await table3.save();

    let table4 = new tables();
    table4.table_number = '4';
    table4.vacant = 1;
    table4.capacity = 4;
    table4.party = null;
    await table4.save();

    let table5 = new tables();
    table5.table_number = '5';
    table5.vacant = 1;
    table5.capacity = 4;
    table5.party = null;
    await table5.save();

    let table6 = new tables();
    table6.table_number = '6';
    table6.vacant = 1;
    table6.capacity = 4;
    table6.party = null;
    await table6.save();

    let table7 = new tables();
    table7.table_number = '7';
    table7.vacant = 1;
    table7.capacity = 4;
    table7.party = null;
    await table7.save();

    let table8 = new tables();
    table8.table_number = '8';
    table8.vacant = 1;
    table8.capacity = 4;
    table8.party = null;
    await table8.save();

    let table9 = new tables();
    table9.table_number = '9';
    table9.vacant = 1;
    table9.capacity = 4;
    table9.party = null;
    await table9.save();

    let table10 = new tables();
    table10.table_number = 'waitlist';
    table10.vacant = 1;
    table10.capacity = 4;
    table10.party = null;
    await table10.save();

    let table11 = new tables();
    table11.table_number = 'reservation';
    table11.vacant = 1;
    table11.capacity = 4;
    table11.party = null;
    await table11.save();
    
    res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }

  */  


  let validationObj = await reservationValidator.execute(req, res);
  if (validationObj.errors.length) {
    log.critical(validationObj.errors);
    return res.status(404).json(validationObj.errors);
  }
  try {
    let reservations = await getParty.execute(req, res);
    res.status(200).json(reservations);
  } catch (error) {
    log.critical(error);
    res.status(404).json(error.message);
  }




};
