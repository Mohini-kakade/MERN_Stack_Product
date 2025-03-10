
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, required: true }, // Unique product ID
  name: { type: String },
  category: { type: String },
  price: { type: Number },
  stock: { type: Number, default: 0 },
  description: { type: String },
  rating: { type: Number, default: 0 }, // Rating field
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
