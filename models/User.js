const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cellPhone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Seller"],
      default: "Seller",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
