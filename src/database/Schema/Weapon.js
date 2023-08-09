const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  cha_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("weapon", WeaponSchema);
