const Product = require('../models/Product');

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    const {  rating,productId,name, category, price, stock, description } = req.body;

    const product = new Product({rating, productId ,name, category, price, stock, description });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
};

// Controller to fetch all products
exports.fetchProductData = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

exports.fetchFilteredProducts = async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.query;
  
      if (!minPrice || !maxPrice) {
        return res.status(400).json({ error: "Both minPrice and maxPrice are required" });
      }
  
      const products = await Product.find({
        price: { $gte: Number(minPrice), $lte: Number(maxPrice) }
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      res.status(500).json({ error: "Server error while fetching products" });
    }
  };


  exports.fetchFilteredProductsByRating = async (req, res) => {
    try {
      const { minRating } = req.query;
  
      if (!minRating) {
        return res.status(400).json({ error: "Rating filter is required" });
      }
  
      const products = await Product.find({ rating: { $gte: Number(minRating) } });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching filtered products by rating:", error);
      res.status(500).json({ error: "Server error while fetching products" });
    }
  };
  
