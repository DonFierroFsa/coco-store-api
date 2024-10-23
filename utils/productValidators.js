const { body, cookie } = require("express-validator");

const validators = {
  name: body("**.name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 3, max: 24 })
    .withMessage("El nombre no es valido"),
  cost: body("**.cost")
    .notEmpty()
    .withMessage("El costo es obligatorio")
    .isNumeric()
    .withMessage("El costo debe ser un numero"),
  quantity: body("quantity")
    .notEmpty()
    .withMessage("Debes especificar la cantidad del producto ingresado"),
  expiresIn: body("expiresIn")
    .notEmpty()
    .withMessage("Debes ingresar la fecha de vencimiento")
    .isDate()
    .withMessage("La fecha debe estar en un formato valido"),
  role: body("token.role")
    .isIn(["Admin"])
    .notEmpty()
    .withMessage("No se cuenta con los permisos necesarios"),
};

module.exports = validators;
