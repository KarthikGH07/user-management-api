import { pbkdf2Sync } from "node:crypto";
import "dotenv/config";

const SALT = process.env.PASSWORD_SALT!;

export function hashPassword(password: string, salt = SALT) {
  const iterations = 10000;
  const keyLength = 64;
  const digest = "sha256";

  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest);

  return { hash, salt };
}

export function verifyPassword(
  password: string,
  storedHash: string,
  salt = SALT
) {
  const { hash } = hashPassword(password, salt);
  return storedHash === hash.toString("hex");
}
