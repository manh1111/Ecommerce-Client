import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col bg-white cursor-pointer h-full">
      <div className="relative w-full pt-[100%]"> 
        <img
          src={product.imageSrc}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-full">
          <img src={product.promotionOverlaySrc} className="w-full h-full object-cover" alt="custom-overlay" />
        </div>
        <div className="absolute bottom-0 right-0 flex pr-1 pb-1">
          <div
            className="w-5 h-5"
            style={{ backgroundImage: `url("https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/43bd6a890841685e2fea.svg")`, backgroundSize: 'cover' }} 
          />
        </div>
      </div>
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1 mb-1 flex-1 flex flex-col justify-between min-h-[4rem]">
          <div className="whitespace-normal line-clamp-2 break-words min-h-[2.5rem] text-sm">
            <img
              src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/f7b68952a53e41162ad3.png"
              alt="flag-label"
              className="mr-0.5 mb-0.5 w-[150px] h-sp14"
            />
            {product.altText}
          </div>
          <div className="flex items-center">
            <div className="flex-shrink min-w-0 mr-1 truncate text-shopee-primary flex items-center font-medium">
              <div className="truncate flex items-baseline">
                <span className="text-xs/sp14 font-medium mr-px">₫</span>
                <span className="font-medium text-base/5 truncate">{product.price}</span>
              </div>
            </div>
            <div className="text-shopee-primary font-medium bg-shopee-pink py-0.5 px-1 text-sp10/3 h-4 rounded-[2px] shrink-0 mr-1">
              {product.discount}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="box-border flex space-x-1 h-5 text-sp10 items-center overflow-hidden mb-2 flex items-center">
            <div className="relative flex items-center text-ellipsis overflow-hidden h-4 max-w-[60%] flex-shrink-0" style={{ color: 'rgb(238, 77, 45)' }}>
              <svg className="w-1 h-4 absolute left-0 top-0" viewBox="-0.25 -0.25 4 16" fill="none">
                <path d="M4 0h-3q-1 0 -1 1v13.5q0 1 1 1h3" stroke="currentColor" stroke-width="0.5" fill="transparent"></path>
              </svg>
              <div className="text-sp10 leading-4 h-4 mx-1 truncate">{product.promotionText}</div>
              <svg className="w-1 h-4 absolute right-0 top-0 transform rotate-180" viewBox="-0.25 -0.25 4 16" fill="none">
                <path d="M4 0h-3q-1 0 -1 1v13.5q0 1 1 1h3" stroke="currentColor" stroke-width="0.5" fill="transparent"></path>
              </svg>
            </div>
            <div className="pointer-events-none text-ellipsis overflow-hidden h-4 flex-grow-0 flex-shrink-1 flex flex-row justify-start items-stretch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 4 16" className="flex-none h-full -mr-px">
                <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="" stroke="#F69113" fill="#F69113"></path>
              </svg>
              <div className="truncate bg-shopee-voucher-yellow text-white leading-4 text-sp10 px-px">{product.voucherText}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 4 16" className="rotate-180 flex-none h-full -ml-px">
                <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" stroke-width="1" transform="" stroke="#F69113" fill="#F69113"></path>
              </svg>
            </div>
          </div>
          <div className="mb-2 flex items-center space-x-1">
            <div className="flex-none flex items-center space-x-0.5 h-sp14" aria-hidden="true">
              <img
                src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/d7099d3fd1dfdaf705ab.svg"
                width="10"
                height="10"
                alt="rating-star-full"
              />
              <div className="text-shopee-black87 text-xs/sp14 flex-none">{product.rating}</div>
            </div>
            <div className="ml-1 h-sp10 scale-x-50 border-l border-shopee-black9"></div>
            <div className="truncate text-shopee-black87 text-xs min-h-4">{product.soldCount}</div>
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
