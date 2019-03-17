const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const connection = require("../../../../startup/database")();
const util = require("util");
const tokenUtil = require("../../../../util/token");

const query = util.promisify(connection.query).bind(connection);
const commonErrorObject = {
  error: {
    code: 500,
    message: "Something went wrong."
  }
};

router.post("/", async (req, res) => {
  try {
    const { id, password } = req.body;
    const results = query("SELECT password FROM user WHERE id=? LIMIT 1", id);
    if (!results.length) {
      return res
        .status(400)
        .send({ error: { code: 400, message: "Invalid id or password" } });
    }

    const validPassword = await bcrypt.compare(password, results[0].password);
    if (!validPassword) {
      return res
        .status(400)
        .send({ error: { code: 400, message: "Invalid id or password" } });
    }

    const token = tokenUtil.generateAuthToken();
    res.send({ data: { token } });
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

module.exports = router;
