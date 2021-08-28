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
  //logged out message
  // const userStatus = req.query.logout === "true" ? "You are logged out" : null;

  //send the product variable to the ejs
  res.render("homepage.ejs", {
    productsController,
  });
});

//test

module.exports = homepageController;
