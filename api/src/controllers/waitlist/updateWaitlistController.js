"use strict";
var updateParty = require("../../domain/updateParty");
var idValidator = require("../../resources/idValidator");
var validator = require("../../resources/waitlistValidator");
var result = { "0": { "stack": "Waitlist was updated successfully!"} }

module.exports.updateWaitlistController = async (req, res, next) => {
  let IDValidation = await idValidator.execute(req, res);
  if (IDValidation.errors.length) {
    let errors = { ...IDValidation.errors, ...req.body}
    log.critical(errors);
    return res.status(404).json(errors);
  }

  let validation = await validator.execute(req, res);
  if (validation.errors.length) {
    let errors = { ...validation.errors, ...req.body}
    log.critical(errors);
    return res.status(404).json(errors);
  }

  try {
    let update = await updateParty.execute(req, res, next);
    if (update.nModified === 1){
      let success = { ...result, ...req.body}
      log.info(success);
      return res.status(200).json(success);
    }
  } catch (error) {
    log.critical(error);
    return res.status(404).json(error.message);
  }
};
