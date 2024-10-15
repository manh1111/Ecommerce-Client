import React from "react";

const ShopInfo = ({ shopData }) => {
  return (
    <div className="flex items-center p-6 border border-gray-200 shadow-md rounded-lg bg-white w-full hover:shadow-lg transition-shadow duration-300">
      {/* Shop Thumbnail and Badge */}
      <a
        className="flex flex-col items-center flex-[1] group"
        href={shopData?.shopLink}
      >
        {shopData?.avatarUrl && (
          <img
            alt="icon head shot"
            className="w-20 h-20 rounded-full shadow-lg border border-gray-300 group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
            src={shopData.avatarUrl}
          />
        )}
        {shopData?.badgeImage && (
          <img
            alt="mall shop badge"
            src={shopData.badgeImage}
            className="w-20 h-5 mt-2"
          />
        )}
      </a>

      {/* Shop Name and Status */}
      <div className="flex flex-col items-center pr-6 border-r border-gray-200 flex-[1.5]">
        {shopData?.sellerName && (
          <div className="text-2xl font-extrabold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors duration-300">
            {shopData.sellerName}
          </div>
        )}
        {shopData?.onlineStatus && (
          <div
            className={`text-sm mt-1 ${
              shopData.onlineStatus === "Online"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {shopData.onlineStatus}
          </div>
        )}
      </div>

      {/* Shop Info Sections */}
      <div className="flex justify-between flex-[2.5] pl-6">
        {/* First Column */}
        <div className="flex flex-col items-center flex-1">
          {shopData?.rating && (
            <div className="flex flex-col items-center mb-3">
              <label className="font-semibold text-gray-600">Đánh giá</label>
              <span className="text-gray-800 text-lg">{shopData.rating}</span>
            </div>
          )}
          {shopData?.joinDate && (
            <div className="flex flex-col items-center">
              <label className="font-semibold text-gray-600">Tham gia</label>
              <span className="text-gray-800 text-lg">{shopData.joinDate}</span>
            </div>
          )}
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-center flex-1">
          {shopData?.productCount && (
            <a
              className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              href={shopData.productListLink}
            >
              <label className="font-semibold text-gray-600">Sản phẩm</label>
              <span className="text-gray-800 text-lg">
                {shopData.productCount}
              </span>
            </a>
          )}
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center flex-1">
          {shopData?.followerCount && (
            <div className="flex flex-col items-center">
              <label className="font-semibold text-gray-600">
                Người theo dõi
              </label>
              <span className="text-gray-800 text-lg">
                {shopData.followerCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
