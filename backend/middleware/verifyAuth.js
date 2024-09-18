const db = require("../models");
const {User} = db;

checkDuplicatePhone = (req, res, next) => {
  // phoneNumber
  User.findOne({
    where: {
        phoneNumber: req.body.phoneNumber
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! phoneNumber is already in use!"
      });
      return;
    }
      next();

  });
};

const verifyAuth = {
    checkDuplicatePhone: checkDuplicatePhone,
};

module.exports = verifyAuth;

