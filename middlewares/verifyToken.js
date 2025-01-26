const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoToken = jwt.verify(token, process.env.JWT_Secrete_Key);
      req.user = decoToken;
    } catch (error) {
      res.status(401).json({ msg: "invalid Token" });
    }
  } else {
    res.status(401).json({ msg: "Token is required" });
  }
};

module.exports = { verifyToken };
