module.exports = app => {
    const scheduleService = require("../controllers/schedulerController.js");
    var router = require("express").Router();
    router.get("/getData", scheduleService.getData);
    router.post("/crudActions", scheduleService.crudActions); 
    app.use('/api/scheduleevents', router);
};