const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
    required: true,
    default: {},
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
LogSchema.index({ name: "text" });
const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
``;
