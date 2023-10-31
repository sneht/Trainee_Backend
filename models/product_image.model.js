const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  file_id: {
    type: String,
    required: false,
  },
  deletedAt: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("ProductImage", productImageSchema);
