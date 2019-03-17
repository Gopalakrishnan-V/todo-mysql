const express = require("express");
const Api = require("./api");
const app = express();

require("./startup/logging")();
require("./startup/database")();
require("./startup/config")();

app.use("/api", Api);

const server = app.listen(6000, () => {
  console.log("Server started running in port 6000");
});

module.export = server;
