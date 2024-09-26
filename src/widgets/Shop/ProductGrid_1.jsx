import React from "react";

const ProductGrid = ({ data }) => {
  if (!data || !data.imageSrc) {
    return "";
  }

  return (
    <div className="relative">
      {/* Image Container */}
      <div className="relative">
        <img
          src={data.imageSrc}
          alt="Product Grid"
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Clickable Links */}
      {data.links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="absolute"
          style={{
            top: link.top,
            left: link.left,
            width: link.width,
            height: link.height,
          }}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
