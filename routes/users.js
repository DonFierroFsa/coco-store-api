const express = require("express");
const controller = require("../controllers/userControllers");
const router = express.Router();

const {
  name,
  password,
  newPassword,
  cellPhone,
  role,
  isActive,
  token,
} = require("../utils/userValidators");
const validate = require("../middlewares/validate");
const jwtValidate = require("../middlewares/jwtValidate");

router.get("/allUsers", jwtValidate, validate, controller.allUser);

router.get("/userById,:id", jwtValidate, controller.userById);

router.get("/userByName,:name", jwtValidate, controller.userByName);

router.post(
  "/newUser",
  jwtValidate,
  [name, password, cellPhone, role, token],
  validate,
  controller.newUser
);

router.put(
  "/updatePassword",
  jwtValidate,
  [role, newPassword],
  validate,
  controller.updatePassword
);

router.put(
  "/updateUser,:name",
  jwtValidate,
  [name, password, cellPhone, role, isActive, token],
  validate,
  controller.updateUser
);

router.delete(
  "/downUser,:name",
  jwtValidate,
  [role],
  validate,
  controller.up_downUser
);

router.delete(
  "/deleteUser,:name",
  jwtValidate,
  [role],
  validate,
  controller.deleteUser
);

module.exports = router;
