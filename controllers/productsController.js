const express = require("express");
const productsControllerData = require("../models/products");
const basicAuth = require("./basicAuth");
const productsController = express.Router();

//ADD PRODUCTS I
productsController.get("/add", basicAuth.authAdmin, (req, res) => {
  // render the UI to create a new post
  res.render("../views/new.ejs");
});

//SHOW PRODUCTS
productsController.get("/:id", async (req, res) => {
  // get the single post by post id
  const selectedProduct = await productsControllerData.findById(req.params.id);
  const success = req.query.success;
  const action = req.query.action;

  res.render("../views/show.ejs", {
    product: selectedProduct,
    success,
    action,
  });
});

//ADD PRODUCTS II
productsController.post("/", async (req, res) => {
  console.log("products POST route");
  const inputs = {
    sku: req.body.sku,
    name: req.body.name,
    productType: req.body.productType,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    title: req.body.title,
    description: req.body.description,
    compatibility: req.body.compatibility,
    material: req.body.material,
    weight: req.body.weight,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty,
  };
  await productsControllerData.create(inputs);

  // Redirect user to the home page and provide the query parameters success and action
  res.redirect("/?success=true&action=create");
});

//SHOW EDIT PRODUCTS PAGE
productsController.get("/:id/edit", basicAuth.authAdmin, async (req, res) => {
  const selectedProduct = await productsControllerData.findById(req.params.id);
  res.render("../views/edit.ejs", {
    product: selectedProduct,
  });
});

//EDIT PRODUCTS - SEND MODIFIED DATA
productsController.put("/:id", async (req, res) => {
  console.log(req.body);
  const inputs = {
    sku: req.body.sku,
    name: req.body.name,
    productType: req.body.productType,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    title: req.body.title,
    description: req.body.description,
    compatibility: req.body.compatibility,
    material: req.body.material,
    weight: req.body.weight,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty,
  };
  await productsControllerData.updateOne(
    {
      _id: req.params.id,
    },
    inputs
  );

  // Redirect user to the single post page and provide the query parameters success and action
  res.redirect(`/products/${req.params.id}?success=true&action=update`);
});

//DELETE PRODUCT
productsController.delete("/:id", async (req, res) => {
  await productsControllerData.deleteOne({
    _id: req.params.id,
  });
  res.redirect("/?success=true&action=delete");
});

//BUY
productsController.put("/buy/:id", async (req, res) => {
  console.log("buy route");
  const boughtProduct = await productsControllerData.findById(req.params.id);
  const boughtProductCurrentQty = boughtProduct.qty;
  const purchaseQty = {
    qty: req.body.qty,
  };
  const newQty = boughtProductCurrentQty - purchaseQty.qty;
  const input = {
    qty: newQty,
  };

  await productsControllerData.updateOne({ _id: req.params.id }, input);
  res.redirect(`/products/${req.params.id}?success=true&action=buy`);
});

module.exports = productsController;
