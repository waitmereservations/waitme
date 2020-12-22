const mongoose = require("mongoose");

/*
const URI =
  "mongodb://" +
  configuration.database.mongo.username() +
  ":" +
  configuration.database.mongo.password() +
  "@mongo:27017/" +
  configuration.database.mongo.database() +
  "?authSource=admin";

const URI =
  "mongodb://" +
  configuration.database.mongo.username() +
  ":" +
  configuration.database.mongo.password() +
  "@mongo:27017/" +
  configuration.database.mongo.database();
*/

const URI =
  "mongodb://" +
  "mongo:27017/" +
  configuration.database.mongo.database();

const connectDB = async () => {
  await mongoose.connect(URI, { useNewUrlParser: true });
  console.log("db connected....");
};

module.exports = connectDB;
