/**
 * Database Setup & Initialization
 * Uses better-sqlite3 for synchronous SQLite operations.
 * Database file is stored at server/data/unistyle.db
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_PATH = path.join(dataDir, 'unistyle.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Initialize all database tables
 */
function initializeDatabase() {
  // ---------- Products Table ----------
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      description TEXT,
      category    TEXT    NOT NULL CHECK(category IN ('corporate','healthcare','hospitality','education','industrial','custom')),
      price_min   REAL    NOT NULL,
      price_max   REAL    NOT NULL,
      image_url   TEXT,
      features    TEXT    DEFAULT '[]',   -- JSON array
      sizes       TEXT    DEFAULT '[]',   -- JSON array
      colors      TEXT    DEFAULT '[]',   -- JSON array
      in_stock    INTEGER DEFAULT 1,      -- boolean 0/1
      created_at  DATETIME DEFAULT (datetime('now'))
    );
  `);

  // ---------- Quotes Table ----------
  db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      name           TEXT    NOT NULL,
      email          TEXT    NOT NULL,
      phone          TEXT,
      company        TEXT,
      industry       TEXT,
      quantity_range TEXT,
      message        TEXT,
      product_ids    TEXT    DEFAULT '[]',  -- JSON array of product IDs
      status         TEXT    DEFAULT 'pending' CHECK(status IN ('pending','reviewed','approved','completed')),
      created_at     DATETIME DEFAULT (datetime('now'))
    );
  `);

  // ---------- Contacts Table ----------
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      phone      TEXT,
      company    TEXT,
      message    TEXT,
      created_at DATETIME DEFAULT (datetime('now'))
    );
  `);

  // ---------- Newsletter Table ----------
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT    NOT NULL UNIQUE,
      subscribed_at DATETIME DEFAULT (datetime('now')),
      active        INTEGER  DEFAULT 1    -- boolean 0/1
    );
  `);

  console.log('[DB] All tables initialized successfully.');
}

// Run initialization on import
initializeDatabase();

module.exports = db;
