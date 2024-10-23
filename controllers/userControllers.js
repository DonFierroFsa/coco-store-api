const User = require("../models/User");
const bcrypt = require("bcrypt");
const CashRegister = require("../models/cashRegister");

const controller = {
  allUser: async (req, res) => {
    try {
      const userList = await User.find();
      res.status(200).json(userList);
    } catch (error) {
      res.status(404).json({
        msg: "No se pudo cargar la lista de usuarios",
        error: error.message,
      });
    }
  },
  userById: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        msg: "No se pudo encontrar el usuario por ID",
        error: error.message,
      });
    }
  },
  userByName: async (req, res) => {
    const name = req.params.name;
    try {
      const user = await User.findOne({ name: name });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        msg: "El usuario no pudo ser encontrado por nombre",
        error: error.message,
      });
    }
  },
  newUser: async (req, res) => {
    const password = req.body.password;
    const saltRounds = 4;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { ...req.body, password: hashedPassword };
    const userCashRegister = { seller: req.body.name };
    try {
      await User.create(newUser);
      await CashRegister.create(userCashRegister);
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .json({ msg: "El usuario no pudo ser cargado", error: error.message });
    }
  },
  updateUser: async (req, res) => {
    const _id = req.body._id;
    const updateData = req.body;
    try {
      await User.findOneAndUpdate({ _id: _id }, updateData);
      const updatedUser = await User.findOne({ _id: _id });
      res.status(200).json({
        msg: "Usuario actualizado",
        updateInfo: updateData,
        user: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        msg: `El usuario ${name} no pudo ser actualizado`,
        error: error.message,
      });
    }
  },
  updatePassword: async (req, res) => {
    const { name, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ name: name });
    const hashedPassword = user.password;

    const verification = await bcrypt.compare(oldPassword, hashedPassword);

    if (verification) {
      const saltRounds = 5;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      try {
        await User.findByIdAndUpdate(
          { _id: user.id },
          { password: hashedPassword }
        );
        res
          .status(200)
          .json({ msg: `La contraseña de ${name} a sido actualizada` });
      } catch (error) {
        res.status(400).json({
          msg: `La contraseña no pudo ser actualizada`,
          error: error.message,
        });
      }
    } else {
      res.status(404).json({ msg: `Usuario : ${name} no encontrado` });
    }
  },
  up_downUser: async (req, res) => {
    const name = req.params.name;
    const user = await User.findOne({ name: name });

    let msg = "";
    if (user.isActive) {
      msg = `El usuario ${name} a sido DESHABILITADO`;
    } else {
      msg = `El usuario ${name} a sido HABILITADO`;
    }
    try {
      await User.findOneAndUpdate({ name: name }, { isActive: !user.isActive });
      res.status(200).json({ msg: msg });
    } catch (error) {
      res.status(400).json({
        msg: `El usuario ${name} no fue modificado`,
        error: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    const name = req.params.name;
    const deletedUser = await User.findOne({ name: name });
    try {
      await User.findOneAndDelete({ name: name });
      await CashRegister.findOneAndDelete({ seller: name });
      res.status(200).json({
        msg: `El usuario ${name}  fue eliminado`,
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(400).json({
        msg: `El usuario ${name}  no pudo ser eliminado`,
        error: error.message,
      });
    }
  },
};

module.exports = controller;
