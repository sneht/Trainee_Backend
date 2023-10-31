const mongoose = require("mongoose");

const userMetaSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
    require: false,
  },
});
module.exports = mongoose.model("UserMeta", userMetaSchema);
