import ProductInfo from "@widgets/Product/ProductInfo";
import ShopInfo from "@widgets/Product/ShopInfo";
import React from "react";

const product = {
  mainImage: {
    src: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd65-lv9rl7ohcznbef",
    alt: "Hình ảnh sản phẩm",
  },
  thumbnails: [
    {
      src: "https://down-vn.img.susercontent.com/file/sg-11110105-7rd6j-lvcr035a6fic3c_tn",
      alt: "Ảnh thu nhỏ 1",
    },
    {
      src: "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzac6jvjx0st89",
      alt: "Ảnh thu nhỏ 2",
    },
    {
      src: "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/160486046c4b1eafcb63.svg",
      alt: "Biểu tượng Video Play",
    },
  ],
  video: {
    src: "https://cvf.shopee.vn/file/api/v4/11110105/mms/sg-11110105-6khwr-lvcqnams1bbqb5.16000081715833895.mp4",
    poster:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rdvo-lza039xj0u872e_tn",
  },
  name: "Sản phẩm mẫu",
  price: 2000000,
  sale_price: 1500000,
  favorites: 123,
  description: "Mô tả chi tiết về sản phẩm mẫu.....",
  usage: "Hướng dẫn sử dụng sản phẩm mẫu.",
};

 const shopInfo = {
   shopLink:
     "/lovito.vn?categoryId=100017&amp;entryPoint=ShopByPDP&amp;itemId=22473942725&amp;upstream=dd",
  thumbnailImage:
     "https://down-vn.img.susercontent.com/file/f87c39a4a3702cd4cb149cacd8114a0b_tn",
   badgeImage:
     "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/483071c49603aa7163a7.png",
   shopName: "LOVITO OFFICIAL STORE",
   onlineStatus: "Online 16 phút trước",
   chatButtonText: "Chat ngay",
   shopIcon:
     "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/192a8dfc1c23525d396b.svg",
   viewShopText: "xem shop",
   rating: "1,9tr",
   responseRate: "100%",
   joinDate: "3 năm trước",
   productListLink: "/lovito.vn#product_list",
   productCount: "37,2k",
   responseTime: "trong vài giờ",
   followers: "3,6tr",
 };

const App = () => {
  return (
    <div className="bg-white">
      <ProductInfo product={product} />
      <ShopInfo shopData={shopInfo} />
    </div>
  );
};

export default App;
