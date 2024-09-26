import React, { useState } from "react";
import ProductCard from "./ProductCard"; // Đảm bảo rằng bạn đã import ProductCard

const TabMenu = ({ categories }) => {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap py-4 px-4">
        {categories.map((category) => (
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
      <div className="p-6">
        {categories.map(
          (category) =>
            activeTab === category.id && (
              <div
                key={category.id}
                className="opacity-100 transition-opacity duration-300"
              >
                <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        imageSrc: product.imageSrc,
                        altText: product.name,
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
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TabMenu;
