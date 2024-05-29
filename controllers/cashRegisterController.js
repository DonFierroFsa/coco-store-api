const Product = require("../models/Product");

const controller = {
  getCash: async (req, res) => {
    req.session.cashRegister
      ? req.session.cashRegister
      : (req.session.cashRegister = 0);
    res.status(200).json({ cash: req.session.cashRegister });
  },
  sell: async (req, res) => {
    const { name, quantity } = req.body;

    const product = await Product.findOne({ name: name });
    if (product) {
      const updatedStock = product.quantity - quantity;
      if (updatedStock > 0) {
        const updateCash = product.price * quantity;

        req.session.cashRegister = req.session.cashRegister + updateCash;

        await Product.findByIdAndUpdate(
          { _id: product.id },
          { quantity: updatedStock }
        );

        res.status(200).json({
          msg: `Venta exitosamente cargada`,
          cashRegister: req.session.cashRegister,
        });
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

    if (cashOut < req.session.cashRegister) {
      req.session.cashRegister = req.session.cashRegister - cashOut;
      res.status(200).json({
        msg: `Fue retirado ${cashOut} de la caja`,
        cashInRegister: req.session.cashRegister,
      });
    } else {
      res.status(200).json({
        msg: "Operación denegada",
      });
    }
  },
};

module.exports = controller;
