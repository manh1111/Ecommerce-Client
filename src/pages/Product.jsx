import React, { useEffect, useState } from "react";
import ProductInfo from "@widgets/Product/ProductInfo";
import ShopInfo from "@widgets/Product/ShopInfo";
import { useParams } from "react-router-dom";
import { getProductById } from "@api/product";
import { getShopById } from "@api/shop";
import { getReviewProductById } from "@api/review"; // Import the API function
import Loader from "@components/Loader";

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [shop, setShop] = useState({});
  const [shopDetails, setShopDetails] = useState({});
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await getProductById(id);
        setProductData(productDetails);

        const shopDetails = await getShopById(productDetails.shop_id._id);
        setShopDetails(shopDetails);
        setShop(shopDetails.shop);

        const productReviews = await getReviewProductById({ id });
        setReviews(productReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!productData) {
    return <Loader />;
  }

  const sellerData = {
    id: shop._id,
    backgroundUrl: shop.logo || "",
    Desc: shop.description || "No description available",
    avatarUrl: shop.logo || "",
    productCount: shopDetails.productsCount || getRandomNumber(10, 100),
    followerCount: shop.followerCount || getRandomNumber(10, 100),
    followingCount: shop.followingCount || getRandomNumber(10, 100),
    reviewsCount: shop.reviewsCount || getRandomNumber(10, 100),
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
  };

  return (
    <div className="bg-white">
      <ProductInfo product={product} shopData={sellerData} />
      <ShopInfo shopData={sellerData} />

      <div className="reviews py-8 px-4 bg-gray-100 rounded-lg shadow-lg my-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {`ĐÁNH GIÁ SẢN PHẨM (${reviews?.length})`}
        </h2>
        {console.log("reviews", reviews)}
        {reviews?.length > 0 && (
          <div className="review-list bg-blue-100 space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="review-item p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="review-header flex items-center space-x-4 mb-4">
                  <img
                    src={review.user_id.avatar}
                    alt={review.user_id.full_name}
                    className="w-12 h-12 shadow-lg rounded-full border-2 border-gray-300"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {review.user_id.full_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 text-lg ${
                        index < review.rating ? "" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
