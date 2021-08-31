const express = require("express");
const contactController = express.Router();

contactController.get("/", (req, res) => {
  res.render("contact.ejs");
});

module.exports = contactController;
