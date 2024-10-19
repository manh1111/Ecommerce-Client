import React from "react";
import "@styles/index.scss"; 

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <img
        src="/src/assets/logo_light.svg"
        alt="ShopPoint"
        className="animate-spin-y"
      />
    </div>
  );
};

export default Loading;
