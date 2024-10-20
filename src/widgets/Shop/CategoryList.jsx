import React, { useState } from "react";
import ProductCard from "./ProductCard"; // Ensure this import is correct

const CategoryList = ({ categories = [] }) => {
  const [priceSortOption, setPriceSortOption] = useState("Giá");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSortOptionClick = (option) => {
    setPriceSortOption(option);
    setDropdownOpen(false);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  // Handle sorting by price
  const sortedCategories = [...categories].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/\D/g, "")); // Extract price as number
    const priceB = parseInt(b.price.replace(/\D/g, ""));

    if (priceSortOption === "Giá thấp đến cao") {
      return priceA - priceB;
    } else if (priceSortOption === "Giá cao đến thấp") {
      return priceB - priceA;
    } else {
      return 0; // Default sorting option ("Phổ biến") - no change
    }
  });

  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = sortedCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full bg-white p-5 relative">
      <fieldset className="border-0 p-0 m-0">
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700 text-sm">
            <span className="font-semibold">{currentPage}</span> /{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="border border-gray-300 rounded px-3 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg viewBox="0 0 8 8" className="w-4 h-4 text-gray-700">
                <path
                  d="M6 1l-4 3 4 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button
              className="border border-gray-300 rounded px-3 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg viewBox="0 0 8 8" className="w-4 h-4 text-gray-700">
                <path
                  d="M2 1l4 3-4 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </fieldset>

      <section className="mt-4">
        {paginatedCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {paginatedCategories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No products available</p>
        )}
      </section>
    </div>
  );
};

export default CategoryList;
