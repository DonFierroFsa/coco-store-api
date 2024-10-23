const { Schema, model } = require("mongoose");

const casinoSchema = new Schema(
  {
    bonus: {
      type: Number,
      required: true,
      lowercase: true,
    },
    nameCasino: {
      type: String,
      required: true,
      lowercase: true,
    },
    cashLoadLimit: {
      type: Number,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
const CasinoData = model("CasinoData", casinoSchema);

module.exports = CasinoData;
