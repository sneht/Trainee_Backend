const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_size: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  brand_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  product_image: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ProductImage",
      required: true,
    },
  ],
  deletedAt: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Product", productSchema);
