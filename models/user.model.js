const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const User = model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      phone: {
        type: String,
        required: true,
        maxLength: 30,
      },
      address: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      role: {
        type: String,
        enum: ["admin", "staff", "customer"],
        default: "customer",
      },
    },
    {
      modelConfig,
    }
  )
);

module.exports = User;
