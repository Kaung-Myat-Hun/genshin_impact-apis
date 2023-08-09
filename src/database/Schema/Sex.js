const mongoose = require("mongoose");

const SexSchema = new mongoose.Schema({
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cha_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "character",
      default: [],
    },
  ],
});

module.exports = mongoose.model("sex", SexSchema);
