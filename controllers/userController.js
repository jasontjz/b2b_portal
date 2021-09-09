const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport-local");
const userControllerData = require("../models/users");
const userController = express.Router();

userController.get("/signup", (req, res) => {
  const success = req.query.success;
  const action = req.query.action;

  res.render("signup.ejs", {
    success,
    action,
  });
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
    res.redirect("/?success=true&action=signup");
  } catch (err) {
    res.redirect("/users/signup?success=true&action=usernametaken");
  }
});

userController.get("/login", (req, res) => {
  //   if (!req.session.username) {
  //     res.render("/login.ejs");
  //   }
  //   res.redirect("/");
  //SIMPLE LOGIN
  const success = req.query.success;
  const action = req.query.action;

  res.render("login.ejs", {
    success,
    action,
  });
});

userController.post("/login", async (req, res) => {
  const selectedUser = await userControllerData.findOne({
    username: req.body.username,
  });

  if (!selectedUser) {
    return res.redirect("/users/login?success=true&action=nousername");
  }

  if (bcrypt.compareSync(req.body.password, selectedUser.password)) {
    req.session.username = selectedUser.username;
    req.session.role = selectedUser.role;
    res.redirect("/?login=true");
  } else {
    res.redirect("/users/login?success=true&action=wrongpassword");
  }
});

userController.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/?success=true&action=logout");
});

userController.get("/view", async (req, res) => {
  const allUsers = userControllerData.find();
  res.render("users.ejs", { allUsers });
});

module.exports = userController;
