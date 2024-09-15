module.exports = app => {
    const masterController = require("../controllers/masterController.js");
    var router = require("express").Router();
    router.get("/", masterController.getData);
    router.get("/:id", masterController.findOne); 
    router.get("/services/:id", masterController.servicesByMaster);
    router.get("/byphone/:phoneNumber", masterController.findByPhone);
    router.get("/byname/:name", masterController.findByName);
    router.post("/", masterController.create);

    router.post("/addservice/:masterId/:serviceId", masterController.addService);



    router.put("/:id", masterController.update);
    router.delete("/:id", masterController.delete);
    app.use('/api/masters', router);
}