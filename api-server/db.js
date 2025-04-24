// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to SQLite DB
const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
