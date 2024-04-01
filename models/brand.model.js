const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/lib");

const Brand = model(
  "Brand",
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

module.exports = Brand;
