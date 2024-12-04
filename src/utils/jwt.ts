import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_TOKEN_SECRET!;

export function generateAccessToken(user: any) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const options: SignOptions = {
    expiresIn: "1 day",
  };

  return jwt.sign(payload, SECRET, options);
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error?.toString() };
  }
}

export function generateRefreshToken(user: {
  id: string;
  name: string;
  email: string;
}) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const options = { expiresIn: "7d" };

  return jwt.sign(payload, SECRET, options);
}
