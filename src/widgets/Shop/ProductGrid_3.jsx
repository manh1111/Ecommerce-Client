import React from "react";

const ProductGrid_3 = ({ imageSrc, links }) => {
  return (
    <div className="relative eH3R6K">
      {/* Image Container */}
      <div className="ggYgpr">
        <img
          src={imageSrc}
          alt="Product Grid"
          className="object-contain w-full h-auto x9Ocbn OCA6Wt"
        />
      </div>

      {/* Clickable Links */}
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="absolute z5Ivmg"
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

export default ProductGrid_3;
