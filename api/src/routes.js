"use strict";

module.exports.load = function (app) {
  app.get("/reservation", coreControllers.defaultReservationController);
  app.delete("/reservation", coreControllers.deleteReservationController);
  app.post("/reservation", coreControllers.newReservationController);
  app.put("/reservation", coreControllers.updateReservationController);
  app.get("/party", coreControllers.defaultPartyController);
  app.put("/asigntable", coreControllers.asignPartyTableController);
  app.post("/waitlist", coreControllers.newWaitlistController);
  app.put("/waitlist", coreControllers.updateWaitlistController);
  app.delete("/waitlist", coreControllers.deleteWaitlistController);
  app.get("/waitlist", coreControllers.defaultWaitlistController);
  app.post("/walkin", coreControllers.newWalkinController);
  app.get("/servers", coreControllers.defaultServerController);

  //app.post("/table", coreControllers.newTableController);
  //app.put("/table", coreControllers.updateTableController);

  app.get("/table", coreControllers.defaultTableController);
  app.put("/updateTableStatus", coreControllers.updateTableStatusController);
  
  app.get("/tableStatus", coreControllers.defaultTableStatusController);

  /*
  app.put(
    "/updateDiningParty",
    coreControllers.updateDiningPartyStatusController
  );
  */
};
