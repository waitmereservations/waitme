"use strict";

global.coreControllers = require("../controllers");
global.Promise = require("bluebird");
global.ApplicationErrors = require("./errors.js");
global.appName = "waitme";
global.log = require("../services/logger.js");
