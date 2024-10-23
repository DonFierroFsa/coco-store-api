const express = require("express");
const controller = require("../controllers/cashRegisterController");
const router = express.Router();
const jwtValidate = require("../middlewares/jwtValidate");
const { role } = require("../utils/userValidators");
const validate = require("../middlewares/validate");
const operationRegister = require("../middlewares/OperationRegister");

router.post("/allCashRegister", jwtValidate, controller.allCashRegister);

router.post(
  "/createMainCashRegister",
  jwtValidate,
  [role],
  validate,
  controller.createMainCashRegister
);

router.get("/cash", jwtValidate, controller.getCash);

router.put("/sell", jwtValidate, validate, controller.sell, operationRegister);

router.put(
  "/cashOut",
  jwtValidate,
  [role],
  validate,
  controller.cashOut,
  operationRegister
);

router.put(
  "/restar",
  jwtValidate,
  [role],
  validate,
  controller.restarCashRegister
);

module.exports = router;
