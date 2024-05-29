const { body, cookie } = require("express-validator");

const validators = {
  name: body("name")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),
  password: body("password")
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    })
    .withMessage(
      "Debe ingresar una contraseña con al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 numero "
    ),
  newPassword: body("newPassword")
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    })
    .withMessage(
      "Debe ingresar una contraseña con al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 numero "
    ),
  cellPhone: body("cellPhone")
    .notEmpty()
    .withMessage("El celular es obligatorio")
    .isMobilePhone("es-AR")
    .withMessage("El formato de teléfono no es valido"),
  isActive: body("isActive")
    .isBoolean(false)
    .withMessage("El usuario no esta activo"),
  role: cookie("token.role")
    .isIn(["Admin"])
    .notEmpty()
    .withMessage("No se cuenta con los permisos necesarios"),
  token: cookie("token").isJWT().withMessage("Token no valido"),
};

module.exports = validators;
