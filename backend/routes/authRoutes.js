const { verifySignUp } = require("../middleware");
const authController = require("../controllers/authController");
var router = require("express").Router();

module.exports = (app) => {
    router.post("/signup",
        [
            verifySignUp.checkDuplicatePhone,
        ],
        authController.signup
    );

    router.post("/signin", authController.signin);

    //router.use('/api/auth', router);

    app.use('/api/auth', router, (req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
};