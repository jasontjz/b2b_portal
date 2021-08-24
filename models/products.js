const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    // sku: { type: String, required: true },
    sku: { type: String, required: false },
    name: { type: String, required: false },
    productType: { type: String, required: false },
    category: { type: String, required: false },
    manufacturer: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    compatibility: { type: String, required: false },
    material: { type: String, required: false },
    weight: { type: Number, required: false },
    img: { type: String, required: false },
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
