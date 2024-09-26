import React, { useState, useCallback } from "react";
import ProductCard from "./ProductCard"; // Ensure this import is correct

const CategoryList = ({ categories = [] }) => {
  const [selectedSortOption, setSelectedSortOption] = useState("Phổ biến");
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
  const sortedCategories = categories.map((category) => {
    if (!category || !category.id) {
      console.error("Undefined category during sorting:", category);
      return { ...category, products: [] }; // Handle invalid category gracefully
    }

    const sortedProducts = [...category.products].sort((a, b) => {
      if (priceSortOption === "Giá thấp đến cao") {
        return a.price - b.price;
      } else if (priceSortOption === "Giá cao đến thấp") {
        return b.price - a.price;
      } else {
        return 0; // Default sorting option ("Phổ biến") - no change
      }
    });

    return { ...category, products: sortedProducts };
  });

  // Paginate products
  const paginatedCategories = sortedCategories.map((category) => {
    if (!category || !category.id) {
      console.error("Undefined category during pagination:", category);
      return { ...category, products: [] }; // Handle invalid category gracefully
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = category.products.slice(startIndex, endIndex);

    return { ...category, products: paginatedProducts };
  });

  const totalPages = Math.ceil(
    categories.flatMap((category) => category.products).length / itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full bg-white p-5 relative">
      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Sắp xếp theo</legend>
        <div className="font-bold mb-2 text-base">Sắp xếp theo</div>
        <div className="flex gap-2 mb-4">
          <section className="flex gap-2">
            {["Phổ biến", "Mới nhất", "Bán chạy"].map((option) => (
              <button
                key={option}
                aria-label={option}
                aria-pressed={selectedSortOption === option}
                className={`px-4 py-2 border rounded transition-colors duration-300 ${
                  selectedSortOption === option
                    ? "bg-red text-white border-red"
                    : "bg-transparent border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedSortOption(option)}
              >
                <span aria-hidden="true">{option}</span>
              </button>
            ))}
          </section>
          <section>
            <button
              type="button"
              role="combobox"
              aria-controls="price-options"
              aria-expanded={dropdownOpen}
              aria-autocomplete="none"
              className="flex items-center px-4 py-2 border rounded text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              <span className="mr-2">{priceSortOption}</span>
              <svg viewBox="0 0 10 6" className="w-4 h-4 text-gray-700">
                <path
                  d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z"
                  fillRule="nonzero"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <ul
                id="price-options"
                className="absolute mt-1 bg-white border rounded shadow-lg z-10"
              >
                {["Giá thấp đến cao", "Giá cao đến thấp"].map((option) => (
                  <li key={option}>
                    <button
                      className={`w-full px-4 py-2 text-left ${
                        priceSortOption === option
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleSortOptionClick(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
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
          paginatedCategories.map((category) => {
            if (!category || !category.id) {
              console.error("Undefined category or category.id:", category);
              return null; 
            }
            return (
              <div key={category.id} className="my-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-700">No categories available</p>
        )}
      </section>
    </div>
  );
};

export default CategoryList;
