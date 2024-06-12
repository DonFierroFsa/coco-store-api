const CashRegister = require("../models/cashRegister");

const operationRegister = async (req, res, next) => {
  const mainCashRegisterID = "66677f9a97655d7e08426c77";
  const { operation } = req.body;
  const { seller } = operation;

  try {
    await CashRegister.findOneAndUpdate(
      { seller: seller },
      {
        $inc: { cash: Number(operation.cashOperated) },
        $push: { operations: [operation, { seller: seller }] },
      }
    );

    await CashRegister.findByIdAndUpdate(mainCashRegisterID, {
      $inc: { cash: Number(operation.cashOperated) },
      $push: { operations: [operation, { seller: seller }] },
    });

    res.json({ msg: "Operación registrada exitosamente" });
    next();
  } catch (error) {
    res.status(404).json({
      msg: "Error en salvado de registro detallado de operación",
      error: error.message,
    });
  }
};
module.exports = operationRegister;
