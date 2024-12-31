import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '@layout/PageHeader';
import SellerProfilesGrid from '@widgets/SellerProfilesGrid';
import Gallery from '@components/Gallery/Gallery';
import QuickLinks from '@components/QuickLink';
import { WEB_DOMAIN } from "../config/config";
import { GetAllProductForUser } from '@api/product';
import { getCategories } from '../api/categorie'; 
import ProductCard from '@widgets/Shop/ProductCard';
import Loader from '@components/Loader'; // Import Loader

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const location = useLocation();

  // Extract the category ID from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');
    if (categoryId) {
      setActiveCategory(categoryId);
    }
  }, [location]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const [productResponse, categoriesResponse] = await Promise.all([
          GetAllProductForUser(),
          getCategories()
        ]);

        const productData = productResponse.data.productsWithCounts.map((product) => ({
          imageSrc: product?.product_img[0],
          promotionOverlaySrc: product?.product_img[1],
          altText: product?.product_name,
          id: product?._id,
          price: product?.product_price,
          discount: "10%",
          promotionText: "Flash Sale",
          rating: product?.avgRating,
          soldCount: product?.soldCount,
          categoryId: product?.categoryId,
        }));

        const rootCategories = categoriesResponse.filter(category => category.level === 0);

        setProducts(productData);
        setCategories(rootCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Filter products by active category
  const filteredProducts = activeCategory
    ? products.filter(product => product.categoryId === activeCategory)
    : products;

  return (
    <>
      <PageHeader title="Discover" changePageName={false} />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader /> {/* Show Loader when loading */}
        </div>
      ) : (
        <>
          <div className="section flex flex-1 flex-col mb-5">
            <Gallery />
          </div>

          <div className="section m-6">
            <QuickLinks />
          </div>
          
          <div className="section mb-4">
            <a target="_self" href="#">
              <img
                className="banner-image"
                src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e"
                alt="Banner"
              />
            </a>
          </div>
          
          <div className="section py-10 bg-gray-50">
            <div className="card no-hover flex flex-col gap-5 !p-5 mb-8 md:mb-[30px] md:!p-[30px] lg:!py-5 lg:flex-row
                            lg:items-center lg:gap-6 bg-white shadow-lg rounded-lg">
              <h1 className="text-3xl font-semibold flex-1 text-center lg:text-left text-gray-800">Danh mục</h1>
            </div>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {console.log('categories', categories)}
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`category-card text-center hover:shadow-xl transition-all duration-300
                             card no-hover gap-5 !p-5 mb-8 md:mb-[30px] md:!p-[30px] lg:!py-5
                            bg-white shadow-lg rounded-lg
                    ${activeCategory === category._id ? 'bg-blue-100' : ''}`}
                >
                  <a
                    href={`${WEB_DOMAIN}/search?category=${category._id}`}
                    className="block"
                  >
                    <img
                      src={category.category_img}
                      alt={category.category_name}
                      className="w-32 h-32 object-cover rounded-full mb-3 transition-transform transform hover:scale-105 mx-auto"
                    />
                    <p className="font-semibold text-lg text-gray-700">{category.category_name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div
              className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                       lg:items-center lg:gap-4"
            >
              <h1 className="text-3xl flex-1 text-center lg:text-left">Cửa hàng</h1>
            </div>
            <SellerProfilesGrid numberOfSellers={6} fullGrid={false} />
          </div>

          <div className="bg-gray-100 rounded-lg">
          <div
              className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                       lg:items-center lg:gap-4"
            >
              <h1 className="text-3xl flex-1 text-center lg:text-left">Tất cả sản phẩm</h1>
            </div>
            <div className="grid grid-cols-6 gap-5">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;
