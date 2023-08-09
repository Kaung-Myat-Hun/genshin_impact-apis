const mongoose = require("mongoose");

const NationSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  cha_live_at: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "character",
      default: [],
    },
  ],
  background: {
    type: mongoose.SchemaTypes.String,
  },
  archon: {
    type: mongoose.SchemaTypes.String,
  },
  detail: {
    type: mongoose.SchemaTypes.String,
    default: "",
  },
});

module.exports = mongoose.model("nation", NationSchema);
