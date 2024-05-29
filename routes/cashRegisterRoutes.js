const express = require("express");
const controller = require("../controllers/cashRegisterController");
const router = express.Router();
const jwtValidate = require("../middlewares/jwtValidate");
const { role, password } = require("../utils/userValidators");
const validate = require("../middlewares/validate");

router.get("/cash", jwtValidate, controller.getCash);

router.put("/sell", jwtValidate, validate, controller.sell);

router.put("/cashOut", jwtValidate, [role], validate, controller.cashOut);

module.exports = router;
