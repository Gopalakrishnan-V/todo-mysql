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
    let { id, password, name } = req.body;
    const matchingRows = await query("SELECT id FROM user WHERE id=?", id);
    if (matchingRows.length) {
      return res
        .status(400)
        .send({ error: { code: 400, message: "User already registered" } });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const addUserResult = await query(
      "INSERT INTO user(id,password,name) VALUES(?,?,?)",
      [id, encryptedPassword, name]
    );
    if (!addUserResult.affectedRows) {
      return res.status(500).send(commonErrorObject);
    }
    const payload = { id };
    const token = tokenUtil.generateAuthToken(payload);
    return res.send({ data: { token } });
  } catch (e) {
    res.status(500).send(commonErrorObject);
    console.log(e);
  }
});

module.exports = router;
