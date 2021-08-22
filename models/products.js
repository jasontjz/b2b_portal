const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    sku: { type: String, required: true },
    name: { type: String, required: true },
    productType: { type: String, required: true },
    categories: [{ type: String, required: true }],
    manufacturer: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    specifications: {
      compatibility: { type: String, required: true },
      material: { type: String, required: true },
      weight: { type: Number, required: true },
    },
    img: { type: String, required: true },
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
