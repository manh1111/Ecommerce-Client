import React, { useEffect, useState } from "react";
import ProductInfo from "@widgets/Product/ProductInfo";
import ShopInfo from "@widgets/Product/ShopInfo";
import { useParams } from "react-router-dom";
import { getProductById } from "@api/product";
import { getShopById } from "@api/shop";
import Loading from "@components/Loading";

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null); 
  const [shop, setShop] = useState({}); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await getProductById(id);
        setProductData(productDetails);

        const shopDetails = await getShopById(productDetails.shop_id._id);
        setShop(shopDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!productData) {
    console.log(productData)
    return <Loading />;
  }

  const sellerData = {
    backgroundUrl: shop.logo || "", 
    Desc: shop.description || "No description available", 
    avatarUrl: shop.logo || "", 
    productCount: shop.productsCount || getRandomNumber(10, 100), 
    followerCount: shop.followerCount || getRandomNumber(10, 100),
    followingCount: shop.followingCount || getRandomNumber(10, 100), 
    sellerName: shop.shop_name || "Unknown Seller", 
    joinDate: new Date(shop.createdAt).toLocaleDateString("vi-VN") || "Unknown",
  };

  const product = {
    id: productData._id,
    mainImage: productData.product_img,
    video: {
      src: "https://cvf.shopee.vn/file/api/v4/11110105/mms/sg-11110105-6khwr-lvcqnams1bbqb5.16000081715833895.mp4",
      poster:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rdvo-lza039xj0u872e_tn",
    },
    name: productData.product_name,
    price: productData.product_price,
    sale_price: productData.product_price,
    favorites: 123,
    description: productData.product_desc || "No description available",
    usage: "Hướng dẫn sử dụng sản phẩm mẫu.",
  };

  return (
    <div className="bg-white">
      <ProductInfo product={product} />
      <ShopInfo shopData={sellerData} />
    </div>
  );
};

export default Product;
