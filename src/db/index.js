const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function createFile(filePath) {
  const absFilePath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(absFilePath)) {
    fs.writeFileSync(absFilePath, '');
  }
  return absFilePath;
}

const db = new sqlite3.Database(
  createFile(process.env.DATABASE_PATH),
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) {
      console.error(error.message);
    }
  },
);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
      id        INTEGER PRIMARY KEY,
      email     TEXT NOT NULL,
      nickname  TEXT NOT NULL,
      password  TEXT NOT NULL,
      birthday  TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS session(
      id  INTEGER PRIMARY KEY, 
      sid TEXT,
      uid INTEGER,
      FOREIGN KEY(uid) REFERENCES user(id)
    );`);
});

module.exports = db;
