const db = require("../models");
const config = require("../config/configAuth");
const User = db.User;
// const Role = db.role;
const DEFAULT_LEVEL = 0 //Customer

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 8),
      level: DEFAULT_LEVEL
    })
    .then(user => {
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
  };
  
  exports.signin = (req, res) => {
    User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        
        // TODO SMS auth instead of password
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
  
        res.status(200).send({
            id: user.id,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: lastName,
            level: level,
            accessToken: token
          });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };