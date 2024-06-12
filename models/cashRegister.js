const { Schema, model } = require("mongoose");

const cashRegisterSchema = new Schema({
  cash: {
    type: Number,
    required: true,
    default: 0,
  },
  seller: {
    type: String,
    required: true,
    unique: true,
  },
  operations: [
    {
      operation: {
        type: String,
        required: true,
      },
      productOperated: {
        type: String,
        required: true,
      },
      quantityOperated: {
        type: Number,
        required: true,
      },
      cashOperated: {
        type: String,
        required: true,
      },
      seller: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const CashRegister = model("CashRegister", cashRegisterSchema);

module.exports = CashRegister;
