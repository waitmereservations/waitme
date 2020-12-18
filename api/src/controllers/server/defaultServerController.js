"use strict";

module.exports.defaultServerController = (req, res) => {
  res.json({
    list: [
      {
        firstName: "Cosmo",
        lastName: "Kramer",
        day: "04/11",
        time: "2:00 PM",
        partySize: 3,
        status: 1,
      },
      {
        firstName: "Jerry",
        lastName: "Sanfield",
        day: "04/12",
        time: "3:00 PM",
        partySize: 5,
        status: 1,
      },
    ],
  });
};
