"use strict";
module.exports.defaultReservationController = require("./reservation/defaultReservationController.js").defaultReservationController;
module.exports.newReservationController = require("./reservation/newReservationController.js").newReservationController;
module.exports.updateReservationController = require("./reservation/updateReservationController.js").updateReservationController;
module.exports.deleteReservationController = require("./reservation/deleteReservationController.js").deleteReservationController;



module.exports.defaultServerController = require("./server/defaultServerController.js").defaultServerController;
module.exports.newWalkinController = require("./walkin/newWalkinController.js").newWalkinController;

module.exports.defaultWaitlistController = require("./waitlist/defaultWaitlistController.js").defaultWaitlistController;
module.exports.newWaitlistController = require("./waitlist/newWaitlistController.js").newWaitlistController;
module.exports.updateWaitlistController = require("./waitlist/updateWaitlistController.js").updateWaitlistController;
module.exports.deleteWaitlistController = require("./waitlist/deleteWaitlistController.js").deleteWaitlistController;

//module.exports.updateDiningPartyStatusController = require("./table_party/updateDiningPartyStatusController.js").updateDiningPartyStatusController;

module.exports.defaultTableController = require("./table/defaultTableController.js").defaultTableController;
module.exports.newTableController = require("./table/newTableController.js").newTableController;
module.exports.updateTableController = require("./table/updateTableController.js").updateTableController;

module.exports.defaultTableStatusController = require("./table/defaultTableStatusController.js").defaultTableStatusController;
module.exports.asignPartyTableController = require("./table/asignPartyTableController.js").asignPartyTableController;
module.exports.updateTableStatusController = require("./table/updateTableStatusController.js").updateTableStatusController;

module.exports.defaultPartyController = require("./party/defaultPartyController.js").defaultPartyController;
