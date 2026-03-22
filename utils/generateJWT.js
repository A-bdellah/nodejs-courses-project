import jwt from "jsonwebtoken";

export default async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return token;
};
