const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Category = model(
  "Category",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
    {
      modelConfig,
    }
  )
);

module.exports = Category;
