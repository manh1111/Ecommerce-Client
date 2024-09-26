import React from "react";

const ShopInfo = ({ shopData }) => {
  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-white w-full">
      {/* Shop Thumbnail and Badge */}
      <a
        className="flex flex-col items-center flex-[1]"
        href={shopData?.shopLink}
      >
        <img
          alt="icon head shot"
          className="w-16 h-16 rounded-lg"
          src={
            shopData?.thumbnailImage ||
            "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/1e1b08f78a2608ccffa9.svg"
          }
        />
        <img
          alt="mall shop badge"
          src={shopData?.badgeImage}
          className="w-20 h-5"
        />
      </a>

      {/* Shop Name and Status */}
      <div className="flex flex-col items-center pr-6 border-r-2 flex-[1.5]">
        <div className="text-xl font-bold">{shopData?.shopName}</div>
        <div className="text-gray-600">{shopData?.onlineStatus}</div>
      </div>

      {/* Shop Info Sections */}
      <div className="flex justify-between flex-[2.5] pl-6">
        {/* First Column */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-600">Đánh giá</label>
            <span className="text-gray-800">{shopData?.rating}</span>
          </div>
          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-600">
              Tỉ lệ phản hồi
            </label>
            <span className="text-gray-800">{shopData?.responseRate}</span>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-600">Tham gia</label>
            <span className="text-gray-800">{shopData?.joinDate}</span>
          </div>
          <a
            className="flex flex-col items-center text-blue-600"
            href={shopData?.productListLink}
          >
            <label className="font-semibold text-gray-600">Sản phẩm</label>
            <span className="text-gray-800">{shopData?.productCount}</span>
          </a>
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-600">
              Thời gian phản hồi
            </label>
            <span className="text-gray-800">{shopData?.responseTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-600">
              Người theo dõi
            </label>
            <span className="text-gray-800">{shopData?.followers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
