"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || "./src/config";
let conf = require("config");
let configuration = {
  isDev: function () {
    return process.env.NODE_ENV.toLowerCase() === "development";
  },
  isProd: function () {
    return process.env.NODE_ENV.toLowerCase().includes("prod");
  },
  config: function () {
    let cfgCopy = JSON.parse(JSON.stringify(conf));
    return cfgCopy;
  },
  database: {
    postgres: {
      username: function () {
        process.env.DATABASE_USERNAME = conf.database.postgres.username;
        return conf.database.postgres.username;
      },
      password: function () {
        return conf.database.postgres.password;
      },
      database: function () {
        return conf.database.postgres.database;
      },
      port: function () {
        return conf.database.postgres.port;
      },
      servicename: function () {
        return conf.database.postgres.servicename;
      },
    },
    mongo: {
      username: function () {
        process.env.DATABASE_USERNAME = conf.database.mongo.username;
        return conf.database.mongo.username;
      },
      password: function () {
        return conf.database.mongo.password;
      },
      database: function () {
        return conf.database.mongo.database;
      },
    },
  },
  logLevel: function () {
    return conf.logLevel;
  },
  server: {
    port: function () {
      return conf.server.port;
    },
    host: function () {
      return conf.server.host;
    },
    requestTimeoutInMilliseconds: function () {
      return conf.server.requestTimeoutInMilliseconds || 15000;
    },
    logDir: function () {
      return conf.server.logDir;
    },
  },
  applicationSettings: function () {
    return conf.applicationSettings;
  },
};

module.exports = (function () {
  configuration.environment = conf.util.getEnv("NODE_ENV");
  global.configuration = configuration;
  console.log("Loading config for: " + configuration.environment);
})();
