import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SellerOverview = ({
  backgroundUrl,
  sellerName,
  Desc,
  avatarUrl,
  productCount,
  rating,
  joinDate,
}) => {
  const [timeSinceJoined, setTimeSinceJoined] = useState("");
  useEffect(() => {
    const calculateTimeSinceJoined = () => {
      const joinedDate = new Date(joinDate);
      const currentDate = new Date();
      const timeDifference = currentDate - joinedDate; // Difference in milliseconds
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

      let timeDisplay = "";

      if (daysDifference > 365) {
        const years = Math.floor(daysDifference / 365); // Calculate years
        timeDisplay = `${years} năm trước`; // Return years
      } else if (daysDifference > 30) {
        const months = Math.floor(daysDifference / 30); // Calculate months
        timeDisplay = `${months} tháng trước`; // Return months
      } else {
        timeDisplay =
          daysDifference > 0
            ? `${daysDifference} day${daysDifference > 1 ? "s" : ""}`
            : "Tham gia hôm nay";
      }

      setTimeSinceJoined(timeDisplay);
    };

    // Initial calculation when the component mounts
    calculateTimeSinceJoined();

    // Set an interval to update every 24 hours (1 day)
    const interval = setInterval(calculateTimeSinceJoined, 1000 * 60 * 60 * 24);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [joinDate]);
  return (
    <div className=" widgets-grid grid-cols-1 md:grid-cols-2 items-center p-6 bg-white shadow-lg rounded-lg mx-auto">
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
            <h4 className="text-sm text-[#ccc]">{Desc}</h4>
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
      <div className="w-full h-full flex items-center justify-around bg-gray-100 pl-[50px]">
        <div className="flex flex-col w-full h-full justify-around  gap-y-2">
          <div className="flex w-fit">
            <span className="font-medium text-gray-800">Sản Phẩm:</span>
            <span className="text-red ml-2 font-semibold">{productCount}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Đánh Giá:</span>
            <span className="text-red ml-2 font-semibold">{rating}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Tham Gia:</span>
            <span className="text-red ml-2 font-semibold">
              {timeSinceJoined}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
