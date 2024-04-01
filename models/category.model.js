const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/lib");

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
