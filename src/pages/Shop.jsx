import Gallery from "@components/Gallery/Gallery";
import CategoryList from "@widgets/Shop/CategoryList";
import CategoryMenu from "@widgets/Shop/CategoryMenu";
import SellerOverview from "@widgets/Shop/SellerOverview";
import TabMenu from "@widgets/Shop/TapMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//api
import { getCatalogByShopId } from "@api/catalog ";
import { getProductsByCatalogShop, getAllProductsShopId } from "@api/product";
import { getShopById } from "@api/shop";
import Loader from "@components/Loader";

const Shop = () => {
  const [shop, setShop] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoader] = useState(true);
  const { id } = useParams();

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  if (!selectedCategoryId && categories.length > 0) {
    setSelectedCategoryId(categories[0].id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true); 
        const shopDetails = await getShopById(id);
        setShop(shopDetails.shop);

        // Fetch catalogs
        const catalogData = await getCatalogByShopId(id);
        setCatalogs(catalogData);

        const productPromises = catalogData?.map(async (catalog) => {
          const catalogId = catalog._id;
          const products = await getProductsByCatalogShop(id, catalogId);
          return { catalog, products };
        });

        const catalogsWithProducts = await Promise.all(productPromises);

        const categories = catalogsWithProducts.map(
          ({ catalog, products }) => ({
            id: catalog._id,
            name: catalog.catalog_name,
            products: products.map((product) => ({
              id: product._id,
              imageSrc: product.product_img[0],
              altText: product.product_name,
              price: `${product.product_price.toLocaleString()} VND`,
              discount: "0%",
              rating: 4.8,
              soldCount: product?.soldCount || 0,
              promotionText: "Khuyến mãi đặc biệt",
              voucherText: "Giảm giá",
              promotionOverlaySrc: "https://example.com/overlay.png",
            })),
          })
        );
        
        setCategories(categories);

        let products;
        if (selectedCategoryId) {
          products = await getProductsByCatalogShop(id, selectedCategoryId);
        } else {
          products = await getAllProductsShopId(id);
        }

        const listProducts = products?.map((product) => ({
          id: product._id,
          imageSrc: product.product_img[0],
          altText: product.product_name,
          price: `${product.product_price.toLocaleString()} VND`,
          discount: "0%",
          rating: product.avgRating,
          soldCount: product.soldCount,
          promotionText: "Khuyến mãi đặc biệt",
          voucherText: "Giảm giá",
          promotionOverlaySrc: "https://example.com/overlay.png",
        }));
        
        console.log("All Products:", listProducts);
        setAllProduct(listProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false); 
      }
    };

    fetchData();
  }, [selectedCategoryId]);


  if (loading) {
    return <Loader />;
  }

  const sellerData = {
    backgroundUrl: shop?.logo,
    Desc: shop.description,
    avatarUrl: shop?.logo,
    productCount: shop.productsCount,
    followerCount: shop.followerCount || getRandomNumber(10, 100),
    followingCount: shop.followingCount || getRandomNumber(10, 100),
    sellerName: shop.shop_name,
    joinDate: shop.createdAt,
    rating: shop.reviewsCount,
  };

  return (
    <>
      <div className="w-full">
        <SellerOverview {...sellerData} />
      </div>
      <div>
        <TabMenu categories={categories} />
      </div>
      <div className="mt-4">
        <Gallery slidesPerView={1} />
      </div>

      <div className="category flex flex-row mt-5">
        <CategoryMenu
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryList categories={allProduct} />
      </div>
    </>
  );
};

export default Shop;
