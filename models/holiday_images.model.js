const mongoose = require("mongoose");

const holiday_imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Holiday_Image", holiday_imageSchema);
