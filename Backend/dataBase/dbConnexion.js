// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("db.sqlite", (err) => {
//   if (err) {
//     console.error("Error opening database", err.message);
//   } else {
//     console.log("Connected to the SQLite database.");
//   }
// });

// module.exports = db;

// const Database = require("better-sqlite3");
// const db = new Database("mydatabase.db");

const db = require("better-sqlite3")("db.sqlite");
