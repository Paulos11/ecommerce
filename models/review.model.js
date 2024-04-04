const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Review = model(
  "Review",
  new Schema(
    {
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },

      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },

      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
    {
      modelConfig,
    }
  )
);

module.exports = Review;
