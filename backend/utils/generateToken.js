import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  console.log("generating token...");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 2 * 60 * 60,
  });
};

export default generateToken;
