const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    vision: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "element",
      required: true,
    },
    sex: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sex",
      required: true,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nation",
      required: true,
    },
    weapon: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    star_lv: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    avatar: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    image: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    showcase: {
      type: mongoose.SchemaTypes.String,
      default: "",
    },
    archon_detail: {
      type: mongoose.SchemaTypes.String,
      default: "",
    },
    cha_detail: {
      type: mongoose.SchemaTypes.String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("character", CharacterSchema);
