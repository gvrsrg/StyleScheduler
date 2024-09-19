module.exports = app => {
    const schedulerController = require("../controllers/schedulerController.js");
    var router = require("express").Router();
    router.get("/getData", schedulerController.getData);
    router.get("/findOne/:id", schedulerController.findOne);
    router.get("/findByMaster/:id", schedulerController.findByMaster);
    router.post("/", schedulerController.create);
    router.put("/:id", schedulerController.update);
    router.delete("/:id", schedulerController.delete);
    router.post("/crudActions", schedulerController.crudActions); 
    app.use('/api/scheduleevents', router);
};