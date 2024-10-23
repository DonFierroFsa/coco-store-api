const jwt = require("jsonwebtoken");

const jwtValidate = (req, res, next) => {
  const { token } = req.body;
  //const token = req.session.token
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          msg: "Debes loeguearte, tu sesión a expirado",
          error: error.message,
        });
      } else {
        res.cookie("payload", decoded, { maxAge: 60 * 1000 });
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "Acceso denegado" });
  }
};
module.exports = jwtValidate;
