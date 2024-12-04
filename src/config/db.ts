import Database from "better-sqlite3";

const db = new Database("my-database.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

db.exec(createUserTable);

export default db;
