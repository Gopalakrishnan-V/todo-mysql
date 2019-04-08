const express = require("express");
const router = express.Router();
const connection = require("../../../../startup/database")();
const auth = require("../../../../middleware/auth");
const util = require("util");

const query = util.promisify(connection.query).bind(connection);
const commonErrorObject = {
  error: {
    code: 500,
    message: "Something went wrong."
  }
};

router.get("/", auth, async (req, res) => {
  try {
    const { user } = req;
    const results = await query(
      "SELECT id,text FROM task WHERE created_by=?",
      user.id
    );
    res.send({ data: { tasks: results } });
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { user } = req;
    let { id } = req.params;
    id = parseInt(id);
    const results = await query(
      "SELECT id FROM task WHERE id=? AND created_by=?",
      [id, user.id]
    );
    if (!results.length) {
      return res
        .status(400)
        .send({ error: { code: 404, message: "Task not found" } });
    }
    return res.send({ data: { task: results[0] } });
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { user } = req;
    const { text } = req.body;
    const result = await query(
      "INSERT INTO task(text,created_by) VALUES(?,?)",
      [text, user.id]
    );
    if (!result.affectedRows) {
      return res.status(500).send(commonErrorObject);
    }
    return res.send({
      data: {
        message: "Task added Successfully",
        task: { id: result.insertId, text }
      }
    });
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { user } = req;
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const result = await query(
      "UPDATE task set text=? WHERE id=? AND created_by=?",
      [text, id, user.id]
    );
    if (result.affectedRows) {
      return res.send({
        data: {
          message: "Task updated Successfully",
          task: { id, text }
        }
      });
    } else {
      const errorObj = commonErrorObject;
      errorObj.error.message = `TaskId ${id} deos not exists`;
      return res.status(404).send(errorObj);
    }
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { user } = req;
    const id = parseInt(req.params.id);
    const result = await query("DELETE FROM task WHERE id=? AND created_by=?", [
      id,
      user.id
    ]);
    if (result.affectedRows) {
      return res.send({ data: { message: "Task deleted Successfully", id } });
    } else {
      const errorObj = commonErrorObject;
      errorObj.error.message = `TaskId ${id} deos not exists`;
      return res.status(404).send(errorObj);
    }
  } catch (e) {
    res.status(500).send(commonErrorObject);
  }
});

module.exports = router;
