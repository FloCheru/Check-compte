const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const HOST = "localhost";
const app = express();

app.use(cors());
app.use(bodyParser.json()); // Ajout de body-parser pour analyser le corps de la requête

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});

module.exports = { app };
