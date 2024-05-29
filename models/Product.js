const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    expiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
