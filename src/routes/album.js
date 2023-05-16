const express = require("express");

const { createAlbum } = require("../controllers/album");

const router = express.Router();

router.post("/artists/:id/albums", createAlbum);

module.exports = router;
