const { Schema, model } = require("mongoose");
<<<<<<< HEAD
const modelConfig = require("@/config");
=======
const { modelConfig } = require("@/config");
>>>>>>> origin/main

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

    modelConfig
  )
);

module.exports = Brand;
