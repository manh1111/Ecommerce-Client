import React from "react";
import { Link } from "react-router-dom";

function ProductGallery({ products }) {
  // If no products are provided, return an empty string
  if (!products || products.length === 0) {
    return "";
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div className="p-2" key={index}>
          <Link to={product.link}>
            <div className="relative w-full h-80 flex justify-center items-center">
              <img
                src={product.imgSrc}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductGallery;
