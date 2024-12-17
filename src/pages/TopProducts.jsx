import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { getCategories } from "../api/categorie";
import { getAllProductsCategoryId } from "../api/product";
import Loader from "@components/Loader";

const TopProducts = ({ hasTitle = true }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState({});
  const navigate = useNavigate();

  // Define color themes
  const categoryThemes = [
    "from-blue-300 via-blue-400 to-blue-500",
    "from-green-300 via-green-400 to-green-500",
    "from-purple-300 via-purple-400 to-purple-500",
    "from-yellow-300 via-yellow-400 to-yellow-500",
    "from-red-300 via-red-400 to-red-500",
    "from-pink-300 via-pink-400 to-pink-500",
    "from-teal-300 via-teal-400 to-teal-500",
    "from-indigo-300 via-indigo-400 to-indigo-500",
  ];

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
        setCategories(categoriesWithProducts);
        const initialPages = {};
        categoriesWithProducts.forEach((category) => {
          initialPages[category._id] = 1;
        });
        setCurrentPage(initialPages);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  const handlePageChange = (categoryId, page) => {
    setCurrentPage((prev) => ({
      ...prev,
      [categoryId]: page,
    }));
  };

  const PRODUCTS_PER_PAGE = 4;

  const handleProductClick = (idProduct) => {
    navigate(`/product/${idProduct}`);
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
          {categories.map((category, index) => (
            <div key={category._id} className="mb-10">
              {/* Category Name */}
              <h2
                className={`text-2xl font-extrabold text-white bg-gradient-to-r ${
                  categoryThemes[index % categoryThemes.length]
                } p-4 rounded-lg shadow-lg border hover:scale-105 transition-transform duration-300 mb-6`}
              >
                {category.category_name}
              </h2>

              {/* Products of the Category */}
              {loadingProducts ? (
                <Loader />
              ) : (
                category.products.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.products
                        .slice(
                          (currentPage[category._id] - 1) * PRODUCTS_PER_PAGE,
                          currentPage[category._id] * PRODUCTS_PER_PAGE
                        )
                        .map((product) => (
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
                              {product.product_desc ||
                                "No description available."}
                            </p>
                            <p className="text-blue-600 font-bold text-lg">
                              {product.product_price.toLocaleString()} VND
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="mt-4">
                      <Pagination
                        current={currentPage[category._id] || 1}
                        total={category.products.length}
                        pageSize={PRODUCTS_PER_PAGE}
                        onChange={(page) =>
                          handlePageChange(category._id, page)
                        }
                        showSizeChanger={false}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
