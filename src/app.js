const express = require("express");
const artistController = require("./routes/artist");
const app = express();

app.use(express.json());
app.use("/artists", artistController);
app.use;

module.exports = app;
