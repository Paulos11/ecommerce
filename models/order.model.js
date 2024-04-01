const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/lib");

const Order = model(
  "Order",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },

      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },

      status: {
        type: Boolean,
        enum: ["Processing", "Confirmed", "Shipping", "Delivered", "Canceled"],
        default: "Processing",
      },
    },
    {
      modelConfig,
    }
  )
);

module.exports = Order;
