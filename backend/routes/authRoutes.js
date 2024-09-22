const { verifySignUp } = require("../middleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController.js");
var router = require("express").Router();

module.exports = (app) => {
    router.post("/signup",
        [
            verifySignUp.checkDuplicatePhone,
        ],
        authController.signup
    );

    router.post("/signin", authController.signin);
    router.post("/login", userController.loginUser);

    //router.use('/api/auth', router);

    app.use('/api/auth', router, (req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
};