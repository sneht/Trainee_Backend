const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    holiday_id: {
      type: String,
      required: true,
      unique: true,
    },
    holiday_title: {
      type: String,
      required: true,
      trim: true,
    },
    holiday_date: {
      type: Date,
      required: true,
      trim: true,
    },
    holiday_img: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Holiday_Image",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("holiday", holidaySchema);
