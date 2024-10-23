const Product = require("../models/Product");
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
      res.status(201).json({ msg: "Caja principal creada con éxito" });
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
    const { operationState, seller } = req.body;
    // const payload = req.cookies.payload;
    // const sellerName = payload.name;

    const details = [];

    if (operationState.length > 0) {
      await Promise.all(
        operationState.map(async (item) => {
          const productName = item.name;
          const quantity = item.quantity;

          const product = await Product.findOne({ name: productName });

          if (product) {
            const updatedStock = product.quantity - quantity;
            if (updatedStock >= 0) {
              const cashOperated = product.price * quantity;

              details.push({
                productOperated: product.name,
                quantityOperated: quantity,
                cashOperated: cashOperated,
              }); // req.session.cashRegister = req.session.cashRegister + updateCash;

              await Product.findByIdAndUpdate(
                { _id: product.id },
                { quantity: updatedStock }
              );
            } else {
              next();
            }
          } else {
            next();
          }
        })
      );
      const numOfOperations = details.length;
      const totalCashOperated = details.reduce(
        (acc, operation) => acc + operation.cashOperated,
        0
      );
      req.body = {
        operations: {
          operation: "sell",
          seller,
          numOfOperations,
          details,
          totalCashOperated,
        },
      };
      next();
    } else {
      res.status(400).json({
        msg: "La venta no puedo cargarse",
      });
    }
  },
  cashOut: async (req, res, next) => {
    const mainCashRegister = await CashRegister.findOne({ seller: "MAIN" });
    const cashInRegister = mainCashRegister.cash;

    const { seller, cashOut } = req.body;

    if (cashOut <= cashInRegister) {
      const details = [
        {
          productOperated: "cashOut",
          cashOperated: cashOut,
        },
      ];
      const numOfOperations = details.length;

      req.body = {
        operations: {
          operation: "cashOut",
          totalCashOperated: cashOut,
          seller: seller,
          details,
          numOfOperations,
        },
      };
      // console.log(cashOut);
      // // req.session.cashRegister = req.session.cashRegister - cashOut;
      // const register = await CashRegister.findOneAndUpdate(
      //   { seller: "MAIN" },
      //   { $inc: { cash: cashOut } }
      // );
      // res.status(200).json({
      //   msg: `Fue retirado ${cashOut} de la caja`,
      //   // cashInRegister: req.session.cashRegister,
      //   cashInRegister: mainCashRegister,
      // });
      next();
    } else {
      res.status(401).json({
        msg: "Operación denegada",
      });
    }
  },
  restarCashRegister: async (req, res) => {
    const { registerCashOwner, cashInRegister } = req.body;

    try {
      // req.session.cashRegister = cashInRegister;
      await CashRegister.findOneAndUpdate(
        { seller: registerCashOwner },
        { cash: cashInRegister, operations: [] }
      );
      res.status(200).json({
        msg: `Caja ${registerCashOwner} restablecida en $${cashInRegister} `,
        cashInRegister: cashInRegister,
      });
    } catch {
      res.status(400).json({
        msg: `Usuario o contraseña erróneos`,
      });
    }
  },
};

module.exports = controller;
