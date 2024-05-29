const express = require("express");
const controller = require("../controllers/authControllers");
const router = express.Router();

const jwtValidate = require("../middlewares/jwtValidate");

router.post("/login", controller.login);

router.post("/logout", jwtValidate, controller.logout);

module.exports = router;
