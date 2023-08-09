const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const CharacterRoutes = require("./routes/character");
const AuthRoute = require("./routes/auth");
const NationRoute = require("./routes/nations");
const ElementRoute = require("./routes/element");
const SexRoute = require("./routes/sex");
const WeaponRoute = require("./routes/weapon");
require("dotenv");
const app = express();
const Port = process.env.PORT || 8008;
require("./database");

const apiUrl = "/api/v1/";

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${apiUrl}characters`, CharacterRoutes);
app.use(`${apiUrl}auth`, AuthRoute);
app.use(`${apiUrl}nation`, NationRoute);
app.use(`${apiUrl}vision`, ElementRoute);
app.use(`${apiUrl}sex`, SexRoute);
app.use(`${apiUrl}weapon`, WeaponRoute);

app.listen(Port, () => console.log(`Server is running on Port : ${Port}`));
