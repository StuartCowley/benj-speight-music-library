const express = require("express");
const albumController = require("../controllers/album");

const router = express.Router();

router.post("/artists/:id/albums", albumController.createAlbum);
router.get("/albums", albumController.getAlbums);
router.get("/albums/:id", albumController.getAlbumById);

module.exports = router;
