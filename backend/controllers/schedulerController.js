const db = require("../models");
const {Schedule, Master, Customer, Service} = db;

const Op = db.Sequelize.Op;

exports.getData = (req, res) => {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date();
    dayEnd.setHours(23, 59, 59, 999);

    Schedule.findAll({
         where: { starttime: {
            [Op.between]: [dayStart, dayEnd]
            } 
        } ,
         include: [ { model: db.Customer, as: 'Customer', attributes: ["id", "phoneNumber", "firstName"] } ,
        { model: db.Master, as: 'Master', attributes: ["id", "workrole", "firstname"] } ,
        { model: db.Service, as: 'Service', attributes: ["id", "serviceName", "serviceDuration"] }
    ], attributes: ["id", "starttime", "endtime", "comment"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SchedulerEvents."
            });
        });
};

// Find a single event with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Schedule.findByPk(id, { include: [ { model: db.Customer, as: 'Customer', attributes: ["id", "phoneNumber", "firstName"] } ,
        { model: db.Master, as: 'Master', attributes: ["id", "workrole", "firstname"] } ,
        { model: db.Service, as: 'Service', attributes: ["id", "serviceName", "serviceDuration"] }
    ], attributes: ["id", "starttime", "endtime", "comment"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving SchedulerEvents with id=" + id
            });
        });

};

// find events by master
exports.findByMaster = (req, res) => {
    const id = req.params.id;
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date();
    dayEnd.setHours(23, 59, 59, 999);

    Schedule.findAll({ where: 
        { masterId: id,
         starttime: {
            [Op.between]: [dayStart, dayEnd]
            }   
         } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SchedulerEvents."
            });
        });

};

//create event
exports.create = async (req, res) => {
    const {date, starttime, endtime, comment, CustomerId, MasterId, ServiceId} = req.body
    const master = await Master.findByPk(MasterId)
    const service = await Service.findByPk(ServiceId)
    const customer = await Customer.findByPk(CustomerId)
    const eventData = {
        date: starttime,
        starttime: starttime,
        endtime: endtime,
        comment: comment,
        customerId: CustomerId,
        masterId: parseInt(MasterId),
        serviceId: ServiceId,
        Customer: customer,
        Master: master,
        Service: service
    };

    console.log(eventData);



    Schedule.create(eventData)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while inserting the events."
                    });
                });
    
};

// update event
exports.update = (req, res) => {
    const id = req.params.id;

    Schedule.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found, or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id=" + id
            });
        });

};

// delete event
exports.delete = (req, res) => {
    const id = req.params.id;

    Schedule.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id=" + id
            });
        });

}


exports.crudActions = (req, res) => {
    console.log("body: ", req.body.added);
    
    if (!!req.body.added !== null){
        if (req.body.added.length > 0) {
        for (var i = 0; i < req.body.added.length; i++) {
            var insertData = req.body.added[i];
            Schedule.create(insertData)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while inserting the events."
                    });
                });
          }
      }}

      console.log("changed: ", !!req.body.changed);
      if (!!req.body.changed){
        if (req.body.changed.length > 0) {
        for (var i = 0; i < req.body.changed.length; i++) {
            var updateData = req.body.changed[i];
            Schedule.update(updateData, { where: { id: updateData.id } })
                .then(num => {
                    if (num == 1) {
                        res.send(updateData);
                    } else {
                        res.send({
                            message: `Cannot update Event with id=${id}. Maybe Event was not found, or req.body is empty!`
                        });
                    }
                 })
                 .catch(err => {
                    res.status(500).send({
                        message: "Error updating Event with id=" + id
                    });
                 });
           }
       }}

       if (!!req.body.deleted){
        if (req.body.deleted.length > 0) {
           for (var i = 0; i < req.body.deleted.length; i++) {
             var deleteData = req.body.deleted[i];
             Schedule.destroy({ where: { id: deleteData.id } })
                .then(num => {
                    if (num == 1) {
                        res.send(deleteData);
                    } else {
                        res.send({
                            message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                        });
                    }
                 })
                 .catch(err => {
                    res.status(500).send({
                        message: "Could not delete Event with id=" + id
                    });
                 });
             }
        }}
};


