const express = require("express");
const artistRouter = require("./routes/artist");
const app = express();

app.use("/artists", artistRouter);

module.exports = app;
