import React from "react";

const SellerCollapseItem = ({ seller, handleCollapse, activeCollapse }) => {
  const isActive = activeCollapse === seller.id;

  return (
    <div
      className={`relative flex flex-col items-start p-4 border rounded-lg shadow-md ${
        isActive ? "bg-gray-100" : "bg-white"
      }`}
      onClick={() => handleCollapse(seller.id)}
    >
      {/* Avatar Section */}
      <div
        className="relative w-full h-40 rounded-lg overflow-hidden mb-4"
        style={{
          backgroundImage: `url(${seller.logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(15px)", // Background blur
        }}
      >
        <img
          className="absolute inset-0 m-auto w-16 h-16 object-cover rounded-full border-4 border-white shadow-lg"
          src={seller.logo}
          alt={seller.shop_name}
        />
      </div>

      {/* Shop Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {seller.shop_name}
        </h3>
        <p className="text-sm text-gray-600">
          <strong>Địa chỉ:</strong> {seller.address}
        </p>
        <p className="text-sm text-gray-600">
          <strong>SĐT:</strong> {seller.phone_number}
        </p>
      </div>

      {/* Expand/Collapse Icon */}
      <div className="absolute top-4 right-4">
        {isActive ? (
          <button className="text-blue-500">Thu gọn</button>
        ) : (
          <button className="text-blue-500">Xem thêm</button>
        )}
      </div>
    </div>
  );
};

export default SellerCollapseItem;
