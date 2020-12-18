"use strict";
var createNewParty = require("../../domain/createParty");
var validator = require("../../resources/waitlistValidator.js");

module.exports.newWaitlistController = async (req, res, next) => {
  let validation = await validator.execute(req, res);
  if (Array.isArray(validation.errors) && !validation.errors.length) {
    try {
      let newParty = await createNewParty.execute(req, res, next);
      log.info(`waitlist was created successfully!`);
      res.status(200).json('waitlist was created successfully!');
    } catch (error) {
      log.critical(error);
      res.status(404).json(error.message);
    }
  } else {
    log.critical(validation.errors);
    return res.status(404).json(validation.errors); 
  }
};
