const CashRegister = require("../models/cashRegister");

const operationRegister = async (req, res) => {
  const mainCashRegisterID = "66677f9a97655d7e08426c77";

  try {
    const { operations } = req.body;
    const { seller } = operations;

    if (operations.operation !== "cashOut") {
      await CashRegister.findOneAndUpdate(
        { seller: seller },
        {
          $inc: { cash: Number(operations.totalCashOperated) },
          $push: { operations: [operations] },
        }
      );

      await CashRegister.findByIdAndUpdate(mainCashRegisterID, {
        $inc: { cash: Number(operations.totalCashOperated) },
        $push: { operations: [operations] },
      });

      res.status(200).json({ msg: "Operación registrada exitosamente" });
    } else {
      console.log(operations);
      await CashRegister.findOneAndUpdate(
        { seller: seller },
        {
          $inc: { cash: -Number(operations.totalCashOperated) },
          $push: { operations: [operations] },
        }
      );

      await CashRegister.findByIdAndUpdate(mainCashRegisterID, {
        $inc: { cash: -Number(operations.totalCashOperated) },
        $push: { operations: [operations] },
      });
      res.status(200).json({ msg: "Operación registrada exitosamente" });
    }
  } catch (error) {
    res.status(404).json({
      msg: "Error en salvado de registro detallado de operación",
      error: error.message,
    });
  }
};
module.exports = operationRegister;
