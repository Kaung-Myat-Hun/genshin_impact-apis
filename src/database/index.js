const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/genshin_impact")
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
