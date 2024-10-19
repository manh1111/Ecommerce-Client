import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col bg-white cursor-pointer h-full border-2 border-gray-200 rounded-lg hover:border-blue-500"
    >
      <div className="relative w-full pt-[100%]">
        <img
          src={product?.imageSrc}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 w-full h-full rounded-t-lg">
          {/* <img
            src={product?.promotionOverlaySrc}
            className="w-full h-full object-cover rounded-t-lg"
            alt="custom-overlay"
          /> */}
        </div>
        <div className="absolute bottom-0 right-0 flex pr-1 pb-1">
          <div
            className="w-5 h-5"
            style={{
              backgroundImage: `url("https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/43bd6a890841685e2fea.svg")`,
              backgroundSize: "cover",
            }}
          />
        </div>
      </div>
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1 mb-1 flex-1 flex flex-col justify-between h-fit">
          <div className="whitespace-normal line-clamp-2 break-words h-fit text-sm">
            <div className="mr-0.5 mb-0.5 w-fit bg-blue-700 p-1 rounded-lg text-base text-white h-fit uppercase ">
              Xử lý bởi ShopPoint
            </div>
            <div className="text-xl font-semibold py-1">{product?.altText}</div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink min-w-0 mr-1 truncate text-xl flex items-center">
              ₫ {product?.price}
            </div>
            <div className="bg-rose-100 font-medium text-[#EE4D2D] p-1 ml-5">
              - {product?.discount}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="box-border space-x-1 h-5 text-sp10 overflow-hidden mb-2 flex items-center">
            <div
              className="relative flex items-center text-ellipsis overflow-hidden h-4 max-w-[60%] flex-shrink-0"
              style={{ color: "rgb(238, 77, 45)" }}
            >
              <svg
                className="w-1 h-4 absolute left-0 top-0"
                viewBox="-0.25 -0.25 4 16"
                fill="none"
              >
                <path
                  d="M4 0h-3q-1 0 -1 1v13.5q0 1 1 1h3"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="transparent"
                ></path>
              </svg>
              <div className="text-sp10 leading-4 h-4 mx-1 truncate">
                {product?.promotionText}
              </div>
              <svg
                className="w-1 h-4 absolute right-0 top-0 transform rotate-180"
                viewBox="-0.25 -0.25 4 16"
                fill="none"
              >
                <path
                  d="M4 0h-3q-1 0 -1 1v13.5q0 1 1 1h3"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="transparent"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mb-2 flex items-center space-x-1">
            <div
              className="flex-none flex items-center space-x-0.5 h-sp14"
              aria-hidden="true"
            >
              <img
                src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/d7099d3fd1dfdaf705ab.svg"
                width="10"
                height="10"
                alt="rating-star-full"
              />
            </div>
            <div className="ml-1 h-sp10 scale-x-50 border-l border-shopee-black9"></div>
            <div className="w-full flex flex-row justify-between">
              <div className="text-base flex-none">{product?.rating}</div>
              <div className="text-base flex-none truncate text-shopee-black87 min-h-4">
                Đã bán {product?.soldCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = ({ product }) => {
  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
};

export default App;
