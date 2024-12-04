import db from "@/config/db";

export const createUser = (name: string, email: string, password: string) => {
  const stmt = db.prepare(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
  );
  return stmt.run(name, email, password);
};

export const getUser = (email: string) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  return stmt.get(email);
};

export const getAllUsers = () => {
  const stmt = db.prepare(`SELECT * FROM users`);
  return stmt.all();
};
