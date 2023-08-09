const { Router } = require("express");
const user = require("../database/Schema/Auth");
const { hashPassword, comparePassword } = require("../utils/helper");

const router = Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const User = await user.findOne({ email });
  if (User) {
    res.status(400).send({
      message: "User already exist with this email",
      status: "failed",
      code: 400,
    });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await user.create({ email, password });
    res.status(200).send({
      message: "registered successful",
      status: "success",
      code: 200,
      data: newUser,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400).send({
      message: "please enter valid email or password",
      status: "failed",
      code: 400,
    });
  }
  const Users = await user.findOne({ email });
  if (!Users) {
    res.status(404).send({
      message: `user not found with this email : ${email}`,
      status: "failed",
      code: 404,
    });
  }
  const isValid = comparePassword(password, Users.password);
  if (isValid) {
    res.status(200).send({
      message: "login successful",
      status: "success",
      code: 200,
    });
  } else {
    res.status(401).send({
      message: "please enter valid email or password",
      status: "failed",
      code: 401,
    });
  }
});

module.exports = router;
