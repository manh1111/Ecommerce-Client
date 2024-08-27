import React from "react";

const SellerOverview = ({
  backgroundUrl,
  sellerName,
  lastOnline,
  avatarUrl,
  productCount,
  followerCount,
  followingCount,
  chatResponseRate,
  rating,
  joinDate,
}) => {
  return (
    <div className=" widgets-grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-6 items-center p-6 bg-white shadow-lg rounded-lg mx-auto">
      {/* Header Section */}
      <div
        className="relative w-full h-40 bg-cover bg-center rounded-t-lg overflow-hidden"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black to-transparent p-4">
          <img
            src={avatarUrl}
            alt={sellerName}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-40 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {sellerName}
            </h1>
            <p className="text-sm text-gray-600">{lastOnline}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-red rounded-lg hover:bg-red-700 transition">
              THEO DÕI
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-red bg-white border border-red-600 rounded-lg hover:bg-red-100 transition">
              NHẮN TIN
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full h-full flex items-center justify-around bg-gray-100">
        <div className="flex flex-col w-full h-full justify-around  gap-y-2">
          <div className="flex w-fit">
            <span className="font-medium text-gray-800">Sản Phẩm:</span>
            <span className="text-red ml-2 font-semibold">
              {productCount}
            </span>
          </div>
          <div className="flex w-fit">
            <span className="font-medium text-gray-800">Người Theo Dõi:</span>
            <span className="text-red ml-2 font-semibold">
              {followerCount}
            </span>
          </div>
          <div className="flex w-fit">
            <span className="font-medium text-gray-800">Đang Theo Dõi:</span>
            <span className="text-red ml-2 font-semibold">
              {followingCount}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-around bg-gray-100">
        <div className="flex flex-col w-full h-full justify-around  gap-y-2">
          <div className="flex w-fit">
            <span className="font-medium text-gray-800">
              Tỉ Lệ Phản Hồi Chat:
            </span>
            <span className="text-red ml-2 font-semibold">
              {chatResponseRate}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Đánh Giá:</span>
            <span className="text-red ml-2 font-semibold">{rating}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Tham Gia:</span>
            <span className="text-red ml-2 font-semibold">{joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
