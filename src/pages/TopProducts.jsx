import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categorie";
import { getAllProductsCategoryId } from "../api/product";
import Loader from "@components/Loader";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; 

const TopProducts = ({ hasTitle = true }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  const PRODUCTS_PER_PAGE = 4;

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      setLoadingCategories(true);
      try {
        const fetchedCategories = await getCategories();
        const categoriesWithProducts = await Promise.all(
          fetchedCategories.map(async (category) => {
            const products = await getAllProductsCategoryId(category._id);
            return { ...category, products };
          })
        );
        
        setCategories(
          categoriesWithProducts.filter(
            (category) => category.products.length > 0 && category.level === 0
          )
        ); // Chỉ giữ các danh mục có sản phẩm
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  const handleProductClick = (idProduct) => {
    navigate(`/product/${idProduct}`);
  };

  const [visibleProducts, setVisibleProducts] = useState({});

  const handleNextPage = (categoryId) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 0) + 1,
    }));
  };

  const handlePrevPage = (categoryId) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [categoryId]: Math.max((prev[categoryId] || 0) - 1, 0),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {hasTitle && (
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Top Products
        </h1>
      )}

      {loadingCategories ? (
        <Loader />
      ) : (
        <div className="widgets-grid grid-cols-1 lg:!gap-10 xl:mb-[50px]">
          {categories.map((category) => {
            const currentPage = visibleProducts[category._id] || 0;
            const startIdx = currentPage * PRODUCTS_PER_PAGE;
            const visibleItems = category.products.slice(
              startIdx,
              startIdx + PRODUCTS_PER_PAGE
            );
            const hasNext = (currentPage + 1) * PRODUCTS_PER_PAGE < category.products.length;

            return (
              <div key={category._id} className="mb-10">
                <h2 className="text-xl font-extrabold text-white bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-4 rounded-lg shadow-lg border hover:scale-105 transition-transform duration-300 mb-6">
                  {category.category_name}
                </h2>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {visibleItems.map((product) => (
                      <div
                        key={product._id}
                        className="p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
                        onClick={() => handleProductClick(product._id)}
                      >
                        <img
                          src={product.product_img[0] || "/placeholder.png"}
                          alt={product.product_name}
                          className="w-full h-40 object-cover rounded-md mb-3 transition-transform duration-300 hover:scale-105"
                        />
                        <h3 className="font-semibold text-lg mb-1 text-gray-800 hover:text-blue-600">
                          {product.product_name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2 italic">
                          {product.product_desc || "No description available."}
                        </p>
                        <p className="text-blue-600 font-bold text-lg">
                          {product.product_price.toLocaleString()} VND
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handlePrevPage(category._id)}
                      className={`${
                        currentPage === 0 ? "invisible" : ""
                      } absolute w-14 h-14 bg-white left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-800 text-black p-4 border-slate-500 rounded-full shadow-lg hover:bg-gray-600 transition-all`}
                    >
                      <LeftOutlined className="text-xl" />
                    </button>

                    <button
                      onClick={() => handleNextPage(category._id)}
                      className={`${
                        hasNext ? "" : "invisible"
                      } absolute w-14 h-14 bg-white right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-gray-800 text-black p-4 border-slate-500 rounded-full shadow-lg hover:bg-gray-600 transition-all`}
                    >
                      <RightOutlined className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
