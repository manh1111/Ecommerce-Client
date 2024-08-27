import React from "react";

const CarouselItem = ({ href, imageSrc, salesText, productName }) => {
  return (
    <li>
      <a className="block group relative" href={href}>
        <div className="relative bg-white rounded-md overflow-hidden shadow-md">
          {/* "TOP" Badge */}
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            TOP
          </div>
          {/* Image */}
          <div className="relative pt-4 pb-6">
            <img
              className="object-cover w-full h-40 transition-transform duration-200 transform group-hover:scale-105"
              src={imageSrc}
              alt={productName}
            />
          </div>
          {/* Hover Content */}
          <div className="absolute bottom-0 inset-x-0 hover:bg-black text-white opacity-0 group-hover:opacity-55 transition-opacity duration-300 flex flex-col justify-center items-center z-20 p-2 group-hover:bg-gray-400">
            <div className="text-sm font-medium">{salesText}</div>
            <div className="text-base font-bold mt-2">{productName}</div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default CarouselItem;
