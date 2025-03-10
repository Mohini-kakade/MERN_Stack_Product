

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchProductData ,fetchFilteredProducts,fetchFilteredProductsByRating} from "../../actions/product";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Slider, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";

const renderStars = (rating) => {
  if (rating === 0) return <span className="text-gray-500 text-sm">No ratings yet</span>;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }
  return stars;
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchProductData();
      if (data && !data.error) {
        setProducts(data);
        setFilteredProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const applyFilter = async () => {
    try {
      const filteredData = await fetchFilteredProducts(priceRange);
      if (filteredData && !filteredData.error) {
        setFilteredProducts(filteredData);
      }
    } catch (error) {
      console.error("Error applying filter:", error);
    }
  };
  const applyRatingFilter = async () => {
    try {
      const filteredData = await fetchFilteredProductsByRating(selectedRating);
      if (filteredData && !filteredData.error) {
        setFilteredProducts(filteredData);
      }
    } catch (error) {
      console.error("Error applying rating filter:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex">
      <div className="w-1/4 p-4 border border-gray-300 rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="border border-gray-300 p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Price</h3>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={10}
            max={100}
          />
          <div className="flex justify-between mt-2 mb-4">
            <input type="number" value={priceRange[0]} readOnly className="border p-1 w-20 text-center" />
            <input type="number" value={priceRange[1]} readOnly className="border p-1 w-20 text-center" />
          </div>
          <Button variant="outlined" className="w-full" onClick={applyFilter}>
            Apply
          </Button>
        </div>
        <div className="border border-gray-300 p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Rating</h3>
          <RadioGroup
  value={selectedRating}
  onChange={async (e) => {
    const ratingValue = Number(e.target.value);
    setSelectedRating(ratingValue);
    await applyRatingFilter();  // Fetch filtered products based on rating
  }}
>
  {[5, 4, 3, 2, 1].map((rating) => (
    <FormControlLabel
      key={rating}
      value={rating}
      control={<Radio sx={{ "&.Mui-checked": { color: "black" } }} />}
      label={<div className="flex">{renderStars(rating)}</div>}
    />
  ))}
</RadioGroup>

        </div>
      </div>

      <div className="w-3/4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="flex items-center border border-gray-300 rounded-md p-4 mb-4">
              <div className="w-28 h-28 relative">
                <Image
                  src="/Images/default-product.jpeg"
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="ml-6 flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <div className="flex items-center">
                  {renderStars(product.rating || 0)}
                  <span className="ml-2 text-gray-500 text-sm">
                    {product.rating || 0} | {product.stock} orders
                  </span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${product.category === "Free Shipping" ? "text-green-600" : "text-yellow-500"}`}>
                  {product.category}
                </p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Buy This
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

