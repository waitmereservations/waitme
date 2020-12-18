"use strict";

let fs = require("fs");
let moment = require("moment");
const path = require("path");
let Elasticsearch = require("winston-elasticsearch");
let os = require("os");

let logLevel = configuration.logLevel() || "debug";
const logDir = configuration.server.logDir() || "/logs";
const rootDir = path.dirname(require.main.filename);

function now() {
  return moment().format();
}

const todayDate = moment().format("MMDDYY").toString();
let errorFilename = path.join(
  rootDir + logDir,
  `/resevations-errors-${todayDate}.log`
);
let infoFilename = path.join(
  rootDir + logDir,
  `/resevations-info-${todayDate}.log`
);
if (logDir != "." && !fs.existsSync(rootDir + logDir)) {
  fs.mkdirSync(rootDir + logDir);
}

Elasticsearch.prototype.name = "elasticsearch";

let winston = require("winston");
let transports = [
  new winston.transports.Console({
    level: logLevel,
    colorize: true,
    timestamp: now,
    prettyPrint: true,
  }),
  new winston.transports.File({
    name: "error-file",
    filename: errorFilename,
    level: "error",
    colorize: true,
    timestamp: now,
    prettyPrint: true,
    json: false,
    handleExceptions: true,
  }),
  new winston.transports.File({
    name: "info-file",
    filename: infoFilename,
    level: "info",
    colorize: true,
    timestamp: now,
    prettyPrint: true,
    json: false,
    handleExceptions: true,
  }),
];
let logger = new winston.Logger({ transports: transports, exitOnError: false });
logger.critical = function (message, error) {
  this.log("crit", message, error);
};
logger.setLevels(winston.config.syslog.levels);
module.exports = global.log = logger;
