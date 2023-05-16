const db = require("../db/index");

exports.createAlbum = async (req, res) => {
  try {
    const { name, year } = req.body;
    const artistID = req.params.id;

    const {
      rows: [album],
    } = await db.query(
      "INSERT INTO Albums (name, year, artistID) VALUES ($1, $2, $3) RETURNING *",
      [name, year, artistID]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
