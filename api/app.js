require("./src/config/configuration.js");

const express = require("express");
let bodyParser = require("body-parser");
const app = express();
const port = configuration.server.port();
const morgan = require("morgan");
const db = require("./src/services/db.js");
let headRequestHandler = require("./src/common/headRequestHandler.js");
let syntaxError = require("./src/common/invalidJSONValidator.js");
var cors = require("cors");

require("./src/common/globals.js");

headRequestHandler.use(app);

app.use(morgan("dev"));
const routes = require("./src/routes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

syntaxError.use(app);

routes.load(app);

db();

app.listen(port, () => {
  log.info(`App listening at http://localhost:${port}`);
});
