const db = require("../models");
const Customer = db.Customer;

// Retrieve all Customers from the database.
exports.getData = (req, res) => {
    Customer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customers."
            });
        });
};

// Find a single Master with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
  
};

// Find a master by phone
exports.findByPhone = (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    Customer.findAll({ where: { phonenumber: {[Op.like]:`%${phoneNumber}%`} } })
        .then(data => {
            console.log(data);
            
            if (data == null) {
                res.status(404).send({
                    message: "Master not found."
                })}
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customer."
            });
        });
        
  
};

// Find a master by phone
exports.findByName = (req, res) => {
    const name = req.params.name;

    Customer.findAll({ where: {
        [Op.or]: {
        firstName: {[Op.iLike]:`%${name}%`},
        lastName: {[Op.iLike]:`%${name}%`},
      },} })
        .then(data => {
            console.log(data);
            
            if (data == null) {
                res.status(404).send({
                    message: "Customer not found."
                })}
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customer."
            });
        });
        
  
};

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.phoneNumber) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Customer
    const customer = {
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
}

//Update Customer
exports.update = (req, res) => {
    const id = req.params.id;
    const customer = {
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    Customer.update(customer, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
}

//Delete Customer
exports.delete = (req, res) => {
    const id = req.params.id;

    Customer.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
}