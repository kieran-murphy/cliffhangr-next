import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assumes Bearer token
    console.log(token);
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
