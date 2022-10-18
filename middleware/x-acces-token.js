const { user } = require("../config/db");
const { verifyToken } = require("../helper/jwt");

async function xaccestoken(req, res, next) {
  console.log("cek");
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "you need to sign in" });
    let decodedToken = verifyToken(token);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = xaccestoken;
