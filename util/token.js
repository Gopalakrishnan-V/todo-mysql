const config = require("config");
const jwt = require("jsonwebtoken");

module.exports.generateAuthToken = payload => {
  const token = jwt.sign(payload, "123456");
  return token;
};
