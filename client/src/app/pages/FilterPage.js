"use client";

import React, { useState } from "react";
import { Slider, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const renderStars = (rating) => {
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

const FilterPage = ({ priceRange, setPriceRange }) => {
  return (
    <div className="w-1/4 p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Filter */}
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
          <div className="text-center">
            <label className="block text-sm font-medium">Min</label>
            <input
              type="number"
              value={priceRange[0]}
              className="border border-gray-300 rounded p-1 w-28 text-center mb-2"
              readOnly
            />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium">Max</label>
            <input
              type="number"
              value={priceRange[1]}
              className="border border-gray-300 rounded p-1 w-28 text-center mb-2"
              readOnly
            />
          </div>
        </div>
        <Button variant="outlined" className="w-full">
          Apply
        </Button>
      </div>

      {/* Rating Filter */}
      <div className="border border-gray-300 p-4 rounded-md mb-4">
        <h3 className="font-medium mb-2">Rating</h3>
        <RadioGroup>
          {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              value={rating}
              control={
                <Radio
                  className="w-5 h-5"
                  sx={{
                    "&.Mui-checked": { color: "black" },
                    "& .MuiSvgIcon-root": { borderRadius: 0 },
                  }}
                />
              }
              label={<div className="flex">{renderStars(rating)}</div>}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterPage;
