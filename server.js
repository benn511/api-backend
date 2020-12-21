//node node_modules/sequelize-auto/bin/sequelize-auto -e sqlite -o "models/" -h "" -d "db.sqlite"
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

var DB_API = require("./routes/db-api");
var middleware = require("./routes/middleware");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware error check
app.use("/db_api/create/event", middleware.eventCreateErrors);
app.use("/db_api/update/event", middleware.eventUpdateErrors);

// Import router functions
app.use("/db_api/", DB_API);

app.listen(3000, () => {
  console.log("Server running on port 3k");
});

module.exports = app;
