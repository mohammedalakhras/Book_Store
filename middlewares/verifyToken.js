const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoToken = jwt.verify(token, process.env.JWT_Secrete_Key);
      req.user = decoToken;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "invalid Token" });
    }
  } else {
    return res.status(401).json({ msg: "Token is required" });
  }
};

//verfy Token and Authorization

function verifyTokenAndAuth(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ msg: "You Are Not Authorized" });
    }
  });
}

//Verify And Admin:
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ msg: "You Are Not Authorized" });
    }
  });
}
module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
