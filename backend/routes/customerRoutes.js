module.exports = app => {
    const customerController = require("../controllers/customerController");
    var router = require("express").Router();
    router.get("/", customerController.getData);
    router.get("/:id", customerController.findOne);
    router.get("/findByPhone/:phoneNumber", customerController.findByPhone);
    router.get("/byname/:name", customerController.findByName);
    router.post("/", customerController.create); 
    router.put("/:id", customerController.update);
    router.delete("/:id", customerController.delete);
    app.use('/api/customers', router);
}