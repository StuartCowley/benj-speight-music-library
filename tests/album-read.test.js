const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Read Albums", () => {
  let artists;
  let albums;
  beforeEach(async () => {
    const artistData = await Promise.all([
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["City & Colour", "Acoustic"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Dayseeker", "Rock"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["The Marcus King Band", "Blues"]
      ),
    ]);
    artists = artistData.map(({ rows }) => rows[0]);

    const albumData = await Promise.all([
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["The Love Still Held Me Near", 2023, artists[0].id]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["Homnesick", 2022, artists[1].id]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["Carolina Confessions", 2018, artists[2].id]
      ),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
  });

  describe("GET /albums", () => {
    it("returns all album records in the database", async () => {
      const { status, body } = await request(app).get("/albums").send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id);
        expect(albumRecord).to.deep.equal(expected);
      });
    });

    describe("GET /albums/{id}", () => {
      it("returns the album with the correct id", async () => {
        const { status, body } = await request(app)
          .get(`/albums/${albums[0].id}`)
          .send();
        expect(status).to.equal(200);
        expect(body.name).to.equal(albums[0].name);
      });

      it("returns a 404 if the album does not exist", async () => {
        const { status, body } = await request(app)
          .get("/albums/123456789")
          .send();

        expect(status).to.equal(404);
        expect(body.message).to.equal("album 123456789 does not exist");
      });
    });
  });
});
