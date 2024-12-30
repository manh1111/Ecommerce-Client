import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; 

const CategoryMenu = ({ categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || null);
  
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const itemsPerPage = 20; 
  const [categoryPageMap, setCategoryPageMap] = useState(
    categories.reduce((acc, category) => {
      acc[category.id] = 1; 
      return acc;
    }, {})
  );

  const handlePageChange = (categoryId, newPage) => {
    setCategoryPageMap((prev) => ({
      ...prev,
      [categoryId]: newPage,
    }));
  };

  return (
    <div className="w-full flex flex-row">
      <div className="w-[250px] bg-white p-5">
      <div className="flex items-center pb-2">
        <svg viewBox="0 0 12 10" className="w-3 h-3 mr-2">
          <g fillRule="evenodd" stroke="none" strokeWidth="1">
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="M0 2h2v-2H0zM4 2h7.152V0H4z"></path>
                  <path d="M0 6h2V4H0zM4 6h7.152V4H4z"></path>
                  <path d="M0 10h2V8H0zM4 10h7.152V8H4z"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span className="font-bold text-xl">Danh Mục</span>
      </div>
      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex items-center cursor-pointer py-1 ${
              activeCategory === category.id
                ? "text-red font-bold"
                : "text-black"
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {activeCategory === category.id && (
              <svg viewBox="0 0 4 7" className="w-2 h-3 mr-2 fill-red ">
                <polygon points="4 3.5 0 0 0 7"></polygon>
              </svg>
            )}
            <span className="truncate max-w-[14ch]">
              {truncateText(category.name, 25)}
            </span>
          </div>
        ))}
      </div>
     </div>
      {categories.map((category) => {
        const currentPage = categoryPageMap[category.id] || 1; 
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProducts = category.products.slice(
          startIndex,
          startIndex + itemsPerPage
        );
        const totalPages = Math.ceil(category.products.length / itemsPerPage);

        return (
         [
          activeCategory === category.id && (
            <div key={category.id} className="w-full bg-white p-5 relative">
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ?
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      imageSrc: product.imageSrc,
                      altText: product.altText,
                      price: product.price,
                      discount: product.discount,
                      rating: product.rating,
                      soldCount: product.soldCount,
                      promotionText: product.promotionText,
                      voucherText: product.voucherText,
                      promotionOverlaySrc: product.promotionOverlaySrc,
                    }}
                  />
                ))
                }
              </div>
            : ( <div className="text-center text-gray-500 w-full">Không có sản phám trong danh sách</div>)}
           

            {/* Pagination Controls */}
            <fieldset className="border-0 p-0 m-0 mt-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 text-sm">
                  <span className="font-semibold">{currentPage}</span> /{" "}
                  <span className="font-semibold">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="border border-gray-300 rounded px-3 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() =>
                      handlePageChange(category.id, currentPage - 1)
                    }
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
                    onClick={() =>
                      handlePageChange(category.id, currentPage + 1)
                    }
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
          </div>
          ) 
         ]
        );
      })}
    </div>
  );
};

export default CategoryMenu;
