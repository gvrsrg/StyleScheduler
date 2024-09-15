const db = require("../models");
const {SchedulerEvents, Master, Customer, Service} = db;

exports.getData = (req, res) => {
    SchedulerEvents.findAll({ include: [ { model: db.Customer, as: 'Customer', attributes: ["id", "phoneNumber", "firstName"] } ,
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

    SchedulerEvents.findByPk(id, { include: [ { model: db.Customer, as: 'Customer', attributes: ["id", "phoneNumber", "firstName"] } ,
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

//create event
exports.create = (req, res) => {
    const {starttime, endtime, comment, customerId, masterId, serviceId} = req.body
    const eventData = {
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        comment: req.body.comment,
        customerId: customerId,
        masterId: masterId,
        serviceId: serviceId
    };

    // const master = await Master.findByPk(masterId)
    // const service = await Service.findByPk(serviceId)
    // const customer = await Customer.findByPk(customerId)

    SchedulerEvents.create(eventData)
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

    SchedulerEvents.update(req.body, {
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

    SchedulerEvents.destroy({
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
            SchedulerEvents.create(insertData)
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
            SchedulerEvents.update(updateData, { where: { id: updateData.id } })
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
             SchedulerEvents.destroy({ where: { id: deleteData.id } })
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


