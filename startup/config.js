const config = require("config");

module.exports = function() {
  if (!"123456") {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
