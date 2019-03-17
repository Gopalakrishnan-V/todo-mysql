var mysql = require("mysql");

let connection;

const getConnection = () => {
  if (connection) {
    return connection;
  }

  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo",
    port: 3307
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  return connection;
};

module.exports = getConnection;
