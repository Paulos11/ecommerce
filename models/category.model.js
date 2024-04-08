const { Schema, model } = require("mongoose");
<<<<<<< HEAD
const modelConfig = require("@/config");
=======
const { modelConfig } = require("@/config");
>>>>>>> origin/main

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

    modelConfig
  )
);

module.exports = Category;
