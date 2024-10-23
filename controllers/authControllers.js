const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const controller = {
  login: async (req, res) => {
    const { name, password } = req.body;
    const userName = { name: name };
    try {
      const user = await User.findOne(userName);
      const hashedPassword = user.password;

      const verification = await bcrypt.compare(password, hashedPassword);

      if (verification && user.isActive) {
        const userPayload = {
          role: user.role,
          isActive: user.isActive,
          name: user.name,
        };
        const token = jwt.sign(userPayload, process.env.JWT_KEY, {
          expiresIn: "8h",
        });
        res.cookie("token", token, { maxAge: 60 * 1000 * 60 * 8 });

        res.status(200).json({
          msg: "Usuario logueado correctamente",
          user: user,
          token: token,
        });
        await User.findOneAndUpdate({ name: name }, { isOnline: true });
      } else {
        res.status(400).json({
          msg: `El usuario ${name}, no puede loguearse`,
          isActive: user.isActive,
          isOnline: user.isOnline,
        });
      }
    } catch (error) {
      res.status(400).json({
        msg: "El usuario no pudo loguearse correctamente",
        error: error.message,
      });
    }
  },
  logout: async (req, res) => {
    const name = req.body.name;
    try {
      await User.findOneAndUpdate({ name: name }, { isOnline: false });
      res
        .status(200)
        .clearCookie("token")
        .json({
          msg: `El usuario ${name} a sido desconectado`,
        });
    } catch (error) {
      res.status(400).json({
        msg: "La sesión no pudo ser cerrada",
        error: error.message,
      });
    }
  },
};
module.exports = controller;
