const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");

// Retrieve all Users from the database.
exports.getData = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.phoneNumber) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const user = {
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};


// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const {phoneNumber, firstName, lastName, level} = req.body;

    const userData = {...req.body}// {phoneNumber, firstName, lastName, level}

    if (!!req.body.password) {
        password = bcrypt.hashSync(req.body.password, 8)
        userData.password = password
    }


    User.update(userData, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
        


  
};


// Find a User by phone
exports.findByPhone = (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    User.findOne({ where: { phoneNumber: phoneNumber } })
        .then(data => {
            console.log(data);
            
            if (data == null) {
                res.status(404).send({
                    message: "User not found."
                })}
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        });
        
  
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Customer Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
  };