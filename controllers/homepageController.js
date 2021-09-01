const express = require("express");
const productsModel = require("../models/products");
const homepageController = express.Router();

homepageController.get("/", async (req, res) => {
  //   get the products and create variable
  const productsController = await productsModel
    .find()
    .sort({ name: "desc" })
    .limit(999)
    .exec();

  const success = req.query.success;
  const action = req.query.action;

  //send the product variable to the ejs
  res.render("homepage.ejs", {
    productsController,
    success,
    action,
  });
});

//test

module.exports = homepageController;
