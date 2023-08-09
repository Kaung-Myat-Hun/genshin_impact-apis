const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
  name: {
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
  element_image: {
    type: mongoose.SchemaTypes.String,
  },
});

module.exports = mongoose.model("element", ElementSchema);
