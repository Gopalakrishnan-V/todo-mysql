const express = require("express");
const router = express.Router();
const Tasks = require("./routes/Tasks");
const Users = require("./routes/Users");
const Auth = require("./routes/Auth");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use("/tasks", Tasks);
router.use("/users", Users);
router.use("/auth", Auth);

module.exports = router;
