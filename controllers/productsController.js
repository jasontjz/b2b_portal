const express = require("express");
const productsControllerData = require("../models/products");
const productsController = express.Router();

productsController.get("/:id", async (req, res) => {
  // get the single post by post id
  const selectedProduct = await productsControllerData.findById(req.params.id);
  res.render("../views/show.ejs", {
    product: selectedProduct,
  });
});

module.exports = productsController;
