const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
    category: {
      type: String,
      required: true,
      default: "other",
    },
    images: {
      type: Array,
      required: true,
    },
    isInOffer: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
