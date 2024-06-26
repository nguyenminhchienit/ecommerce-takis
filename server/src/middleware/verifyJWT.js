const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const key = "nguyenminhchienit";

const verifyJWT = asyncHandler(async (req, res, next) => {
  // headers: {
  //     authorization: Bearer token
  // }
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, key, (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          mes: "Invalid access token",
        });
      }

      req.user = decode; // giai ma token thanh lai data da gui vao
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log("Check user mid: ", req.user);
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      mes: "Require is admin role",
    });
  }
  next();
});

module.exports = {
  verifyJWT,
  isAdmin,
};
