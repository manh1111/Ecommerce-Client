import React, { useState } from "react";

const CategoryMenu = ({ categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
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
            onClick={() => setActiveCategory(category.id)}
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
  );
};

export default CategoryMenu;
