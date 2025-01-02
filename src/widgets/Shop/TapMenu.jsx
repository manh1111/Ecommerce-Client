import React, { useState } from "react";
import { Pagination } from "antd";
import ProductCard from "./ProductCard";

const TabMenu = ({ categories }) => {
  const [activeTab, setActiveTab] = useState(categories?.[0]?.id || null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of products per page

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-md card">
      {/* Tab Navigation */}
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap py-4 px-4">
        {categories?.map((category) => (
          <a
            key={category.id}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === category.id
                ? "text-red-600 font-bold border-b-4 rounded-sm border-red"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick(category.id)}
          >
            <span className="text-2xl">{category.name}</span>
          </a>
        ))}
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {categories?.map(
          (category) =>
            activeTab === category.id && (
              <div key={category.id}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {category.products
                    ?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((product) => (
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
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={category.products?.length || 0}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TabMenu;
