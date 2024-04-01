const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/lib");

const Product = model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discounted_price: {
        type: Number,
        default: 0,
      },

      images: [
        {
          type: String,
          required: true,
        },
      ],

      categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
      brandId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
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

module.exports = Product;
