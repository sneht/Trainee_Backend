const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("department", departmentSchema);
