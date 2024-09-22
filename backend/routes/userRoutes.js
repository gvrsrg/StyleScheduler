const { authJwt } = require("../middleware");
const userController = require("../controllers/userController.js");

module.exports = app =>{
    var router = require("express").Router();
    router.get("/", userController.getData);
    router.get("/:id", userController.findOne);
    router.get("/findByPhone/:phoneNumber", userController.findByPhone);
    router.post("/", userController.create); 
    router.put("/:id", userController.update);
    router.delete("/:id", userController.delete);
    router.get("/test/all", userController.allAccess);
    router.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard
      );
    
    app.use('/api/users', router);

}