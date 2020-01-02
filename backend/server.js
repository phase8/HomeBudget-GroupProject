const express = require("express");
const app = express();
const config = require("config");

if (!config.get("privateKey")) {
  console.log("FATAL ERROR: privateKey is not defined!");
} else if (config.get("privateKey") === "exampleKey") {
  console.log("WARNING: You should set privateKey variable!");
}

require("./startup/routes")(app);
require("./startup/database")();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
