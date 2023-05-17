import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./webhooks.db');

const createSchema = () => {
  db.serialize(() => {
    db.run("CREATE TABLE Users (id Integer, username Text, url Text)");

    const stmt = db.prepare("INSERT INTO Users VALUES (?)");

    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM Users", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
  });
  db.close();
}

createSchema()