const express = require('express');
const { addProduct, fetchProductData ,fetchFilteredProducts,fetchFilteredProductsByRating} = require('../controllers/productController');

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/fetchProductData', fetchProductData); 
router.get('/fetchFilteredProducts', fetchFilteredProducts);
router.get('/fetchFilteredProductsByRating', fetchFilteredProductsByRating);
module.exports = router;
