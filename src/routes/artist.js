const express = require("express");
const { artistController } = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.route("/").post(artistController);

module.exports = artistRouter;
