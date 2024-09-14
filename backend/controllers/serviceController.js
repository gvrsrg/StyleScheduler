const db = require("../models");
const Service = db.Service;

// Retrieve all Services from the database.
exports.getData = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Service."
            });
        });
};

//Create new Service
exports.create = (req, res) => {
    const service = {
        serviceName: req.body.serviceName,
        serviceDuration: req.body.serviceDuration
    };
    Service.create(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service."
            });
        });
};

//Update Service
exports.update = (req, res) => {
    const id = req.params.id;
    const service = {
        serviceName: req.body.serviceName,
        serviceDuration: req.body.serviceDuration
    };
    Service.update(service, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service with id=" + id
            });
        });

};

//Delete Service
exports.delete = (req, res) => {
    const id = req.params.id;
    Service.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });

}