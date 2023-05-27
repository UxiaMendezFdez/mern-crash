import asyncHandler from "express-async-handler";
import messages from "../utils/messages.js";
import jwt from "jsonwebtoken";

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //adds the user object to the response of all requests that use this middleware
      //except the password for security
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(messages.UNAUTHORIZED);
    }
  } else {
    res.status(401);
    throw new Error(messages.UNAUTHORIZED);
  }
});

export { verifyToken };
