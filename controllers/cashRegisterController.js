const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CashRegister = require("../models/cashRegister");

const controller = {
  allCashRegister: async (_, res, next) => {
    try {
      const cashRegisterList = await CashRegister.find();
      res.status(200).json(cashRegisterList);
      next();
    } catch (error) {
      res.status(404).json({
        msg: "No se pudo cargar las cajasRegistradoras",
        error: error.message,
      });
    }
  },

  createMainCashRegister: async (_, res) => {
    const mainCashRegister = {
      cash: 0,
      seller: "MAIN",
    };
    try {
      await CashRegister.create(mainCashRegister);
      res.status(201).json({ msg: "Caja principal creada con exito" });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "La caja Main ya existe", error: error.message });
    }
  },
  getCash: async (req, res) => {
    // req.session.cashRegister
    //   ? req.session.cashRegister
    //   : (req.session.cashRegister = 0);
    // res.status(200).json({ cash: req.session.cashRegister });
    const cashRegisterName = req.body.cashRegisterName
      ? req.body.cashRegisterName
      : "MAIN";
    const cashRegister = await CashRegister.findOne({
      seller: cashRegisterName,
    });

    if (cashRegister) {
      res.status(200).json(cashRegister);
    } else
      res
        .status(404)
        .json({ error: `No se pudo cargar la caja ${cashRegisterName}` });
  },
  sell: async (req, res, next) => {
    const { name, quantity } = req.body;
    const payload = req.cookies.payload;
    const sellerName = payload.name;

    const product = await Product.findOne({ name: name });

    if (product) {
      const updatedStock = product.quantity - quantity;

      if (updatedStock >= 0) {
        const updateCash = product.price * quantity;
        req.body = {
          operation: {
            operation: "sell",
            productOperated: product.name,
            quantityOperated: quantity,
            cashOperated: updateCash,
            seller: sellerName,
          },
        };

        // req.session.cashRegister = req.session.cashRegister + updateCash;

        await Product.findByIdAndUpdate(
          { _id: product.id },
          { quantity: updatedStock }
        );

        next();
      } else {
        res.status(400).json({ msg: "El stock es insuficiente" });
      }
    } else {
      res.status(400).json({
        msg: "la venta no pudo cargarse, el producto no fue encontrado",
      });
    }
  },
  cashOut: async (req, res) => {
    const cashOut = req.body.cashOut;
    const mainCashRegister = await CashRegister.findOne({ seller: "MAIN" });
    const cashInRegister = mainCashRegister.cash;

    if (cashOut < cashInRegister) {
      const payload = req.cookies.payload;
      const sellerName = payload.name;

      req.body = {
        operation: {
          operation: "cashOut",
          cashOperated: cashOut,
          seller: sellerName,
        },
      };
      // req.session.cashRegister = req.session.cashRegister - cashOut;
      await CashRegister.findOneAndUpdate(
        { seller: "MAIN" },
        { $inc: { cash: -cashOut } }
      );
      res.status(200).json({
        msg: `Fue retirado ${cashOut} de la caja`,
        // cashInRegister: req.session.cashRegister,
        cashInRegister: mainCashRegister,
      });
    } else {
      res.status(400).json({
        msg: "Operación denegada",
      });
    }
  },
  restarCashRegister: async (req, res) => {
    const { name, password, cashInRegister } = req.body;
    const user = await User.findOne({ name: name });
    const verification = await bcrypt.compare(password, user.password);

    if (verification) {
      // req.session.cashRegister = cashInRegister;
      await CashRegister.findOneAndUpdate(
        { seller: "MAIN" },
        { cash: cashInRegister }
      );
      res.status(200).json({
        msg: `Caja restablecida luego de arqueo `,
        cashInRegister: cashInRegister,
      });
    } else {
      res.status(400).json({
        msg: `Usuario o contraseña erróneos`,
      });
    }
  },
};

module.exports = controller;
