module.exports = app =>{
    const userController = require("../controllers/userController.js");
    var router = require("express").Router();
    router.get("/getData", userController.getData);
    router.post("/create", userController.create); 
    router.get("/findOne/:id", userController.findOne);
    router.get("/findByPhone/:phoneNumber", userController.findByPhone);
    router.put("/update/:id", userController.update);
    router.delete("/delete/:id", userController.delete);

    app.use('/api/users', router);
}