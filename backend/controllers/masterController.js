const db = require("../models");
const {Master, Service} = db;
const Op = db.Sequelize.Op;

// Retrieve all Masters from the database.
exports.getData = (req, res) => {
    Master.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};

// Find a single Master with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Master.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Master with id=" + id
            });
        });
  
};

// Find a master by phone
exports.findByPhone = (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    Master.findAll({ where: { phonenumber: {[Op.like]:`%${phoneNumber}%`} } })
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
                    err.message || "Some error occurred while retrieving Master."
            });
        });
        
  
};

// Find a master by phone
exports.findByName = (req, res) => {
    const name = req.params.name;

    Master.findAll({ where: {
        [Op.or]: {
        firstname: {[Op.iLike]:`%${name}%`},
        lastname: {[Op.iLike]:`%${name}%`},
      },} })
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
                    err.message || "Some error occurred while retrieving Master."
            });
        });
        
  
};


//Fins all Services by Master
exports.servicesByMaster = (req, res) => {
    const id = req.params.id;

    Service.findAll({
        where: {
            masterId: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Services for Master with id=" + id
            });
        });
}

//Add Service to Master
exports.addService = async (req, res) => {
    const masterId = req.params.masterId
    const serviceId = req.params.serviceId

    const master = await Master.findByPk(masterId)
    const service = await Service.findByPk(serviceId)
//    console.log(master,service);
    

    master.addService(service).then(
        data => res.send(data)
    ).catch(
        err => res.status(500).send(err)
        )

    // service.addMaster(master).then(
    //     data => res.send(data)
    // ).catch(
    //     err => res.status(500).send(err)
    //     )

}

// Create new Master
    
exports.create = (req, res) => {
    const { phonenumber, workrole, firstname, lastname} = req.body
    const master = {
        phonenumber,
        workrole,
        firstname,
        lastname
    }

    // Save Master in the database
    Master.create(master)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Master."
            });
        });
};


// Update Master
exports.update = (req, res) => {
    const id = req.params.id;
    const master = {
        phonenumber: req.body.phonenumber,
        workrole: req.body.workrole,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    Master.update(master, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Master was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Master with id=${id}. Maybe Master was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Master with id=" + id
            });
        });
};

// Delete Master

exports.delete = (req, res) => {
    const id = req.params.id;
    Master.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Master was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Master with id=${id}. Maybe Master was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Master with id=" + id
            });
        });
};
