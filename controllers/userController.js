const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport-local");
const userControllerData = require("../models/users");
const userController = express.Router();

userController.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

userController.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt, hashedPassword);
    await userControllerData.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.send("OK, created");
  } catch (err) {
    res.send(`Unable to create  new account: ${err.message}`);
  }
});

userController.get("/login", (req, res) => {
  //   if (!req.session.username) {
  //     res.render("/login.ejs");
  //   }
  //   res.redirect("/");

  //SIMPLE LOGIN
  res.render("login.ejs");
});

userController.post("/login", async (req, res) => {
  const selectedUser = await userControllerData.findOne({
    username: req.body.username,
  });

  if (!selectedUser) {
    return res.send("Username doesn't exist");
  }

  if (bcrypt.compareSync(req.body.password, selectedUser.password)) {
    req.session.username = selectedUser.username;
    req.session.role = selectedUser.role;
    res.redirect("/");
  } else {
    res.send("wrong password");
  }
});

userController.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/?logout=true");
});

userController.get("/view", async (req, res) => {
  const allUsers = userControllerData.find();
  res.render("users.ejs", { allUsers });
});

module.exports = userController;
