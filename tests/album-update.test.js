const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Update Album", () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
      ["City & Colour", "Acoustic"]
    );
    artist = rows[0];

    const albumData = await db.query(
      "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
      ["The Love Still Held Me Near", 2023, artist.id]
    );

    album = albumData.rows[0];
  });

  describe("PUT /albums/id", () => {
    it("replaces the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({ name: "Little Hell", year: 2011, artistID: artist.id });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "Little Hell",
        year: 2011,
        artistid: artist.id,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .put(`/albums/999999999`)
        .send({ name: "Little Hell", year: 2011 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });

  describe("PATCH /albums/{id}", () => {
    it("updates the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: "Little Hell", year: 2011, artistID: artist.id });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "Little Hell",
        year: 2011,
        artistid: artist.id,
      });
    });
    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .patch("/albums/999999999")
        .send({ name: "Reunion Tour Live", year: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });
});
