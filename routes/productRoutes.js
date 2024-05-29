const express = require("express");
const router = express.Router();
const controller = require("../controllers/productControllers");
//Middlewares
const {
  name,
  cost,
  quantity,
  expiresIn,
  role,
} = require("../utils/productValidators");
const validate = require("../middlewares/validate");
const jwtValidate = require("../middlewares/jwtValidate");

//Routes
router.get("/table", jwtValidate, controller.table);

router.get("/productId,:id", jwtValidate, controller.searchById);

router.get("/productName,:name", jwtValidate, controller.searchByName);

router.get("/dolarPrice", controller.dolarPrice);

router.post(
  "/newProduct",
  jwtValidate,
  [name, cost, quantity, expiresIn, role],
  validate,
  controller.newProduct
);

router.put(
  "/updateProduct,:name",
  jwtValidate,
  [name, cost, quantity, expiresIn, role],
  validate,
  controller.updateProduct
);

router.delete(
  "/deleteProduct,:name",
  jwtValidate,
  [role],
  validate,
  controller.deleteProduct
);

router.delete("/clearAll", jwtValidate, [role], validate, controller.clearAll);

module.exports = router;
