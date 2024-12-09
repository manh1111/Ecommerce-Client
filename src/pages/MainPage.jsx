// components
import PageHeader from '@layout/PageHeader';
import TopProducts from './TopProducts';
import SellerProfilesGrid from '@widgets/SellerProfilesGrid';
import Gallery from '@components/Gallery/Gallery';
import QuickLinks from '@components/QuickLink';
import Carousel from '@components/Carousel/Carousel';
import { getCookie } from '@utils/cookie';
import { jwtDecode } from "jwt-decode";
import { GetAllProduct } from '@api/product';
import { useEffect, useState } from 'react';
import ProductCard from "@widgets/Shop/ProductCard";

// Decode JWT Token to get User Info
if (getCookie("user_login")) {
  const token = JSON.parse(getCookie("user_login"));
  try {
    const dataInforUser = jwtDecode(token);
  } catch (error) {
  }
}

const MainPage = () => {
  const [products, setProducts] = useState([]);

 useEffect(() => {
   const fetchProductData = async () => {
     try {
       const product = await GetAllProduct();
       const productData = product.data.productsWithCounts;
       const mappedProducts = productData.map((product) => ({
         imageSrc: product?.product_img[0],
         promotionOverlaySrc: product?.product_img[1],
         altText: product?.product_name,
         id: product?._id,
         price: product?.product_price,
         discount: "10%",
         promotionText: "Flash Sale",
         rating: product?.avgRating,
         soldCount: product?.soldCount,
       }));
       setProducts(mappedProducts);
     } catch (error) {
       console.error("Error fetching product data:", error);
     }
   };
   fetchProductData();
 }, []);
  
  console.log("first", products);
  return (
    <>
      <PageHeader title="Discover" changePageName={false} />
      <div className="section flex flex-1 flex-col mb-5">
        <Gallery />
      </div>

      <div className="section m-6">
        <QuickLinks />
      </div>
      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">SHOP</h1>
        </div>
        <SellerProfilesGrid numberOfSellers={6} fullGrid={false} />
      </div>

      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">TOP PRODUCT</h1>
        </div>
        <TopProducts hasTitle={false} />
      </div>


      <div className="section">
        <a target="_self" href="#">
          <img
            className="banner-image"
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e"
            alt="Banner"
          />
        </a>
      </div>

      <div className="grid grid-cols-6 gap-5 my-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default MainPage; 