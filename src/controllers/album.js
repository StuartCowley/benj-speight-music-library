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

exports.getAlbums = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Albums");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM Albums WHERE id = ${id}`);
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
