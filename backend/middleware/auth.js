const jwt = require("jsonwebtoken");
const config = require("../config/configAuth.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.level === 4) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
      return;
    });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.level === 3) {
        next();
        return;
    }
      res.status(403).send({
        message: "Require Manager Role!"
      });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,

};
module.exports = authJwt;