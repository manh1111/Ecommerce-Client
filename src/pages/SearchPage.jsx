import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@widgets/Shop/ProductCard";
import { getCategoriesTree } from "@api/categorie";
import { searchProduct } from "@api/product";
import { useSearchProduct } from "@contexts/searchProductContext";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const SearchPage = () => {
  const {
    searchTerm,
    filteredProducts,
    loadMoreProducts,
    updateProductList,
  } = useSearchProduct();

  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({}); // Tracks expanded state
  const [selectedSortOption, setSelectedSortOption] = useState("Phổ biến");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [activeCategory, setActiveCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const catalogData = await getCategoriesTree();
      setCategories(catalogData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const searchProducts = useCallback(async (term, categoryId, page, sortBy) => {
    try {
      const data = await searchProduct({
        searchQuery: term,
        category: categoryId,
        page,
        limit: itemsPerPage,
        sortBy,
      });

      updateProductList(data.productsWithCounts || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const sortByMap = {
        "Phổ biến": "sold_count",
        "Mới nhất": "-createdAt",
        "Giá thấp đến cao": "price_asc",
        "Giá cao đến thấp": "price_desc",
      };

      const sortBy = sortByMap[selectedSortOption];
      searchProducts(searchTerm, activeCategory, currentPage, sortBy);
    }
  }, [searchTerm, activeCategory, currentPage, selectedSortOption, searchProducts]);

  useEffect(() => {
    // Extract the category ID from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      setCurrentPage(1); // Reset to the first page
    }
  }, []); // Only run once on component mount

  const handleCategoryClick = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  }, []);

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const renderCategories = (categories, depth = 0) => {
    return categories.map((category) => (
      <div key={category._id} style={{ paddingLeft: depth * 4 }}>
        <div
          className={`cursor-pointer py-1 flex items-center justify-between ${
            activeCategory === category._id ? "text-red font-bold" : "text-black"
          }`}
          onClick={() => handleCategoryClick(category._id)}
        >
          <span>{category.category_name}</span>
          {category.children && category.children.length > 0 && (
            <button
              className=" text-sm text-gray-500"
              onClick={(e) => {
                e.stopPropagation(); 
                toggleCategoryExpansion(category._id);
              }}
            >
              {expandedCategories[category._id] ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </button>
          )}
        </div>
        {expandedCategories[category._id] &&
          category.children &&
          renderCategories(category.children, depth + 1)}
      </div>
    ));
  };

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage > currentPage) {
        loadMoreProducts(newPage);
      }
      setCurrentPage(newPage);
    },
    [currentPage, loadMoreProducts]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-row w-full h-screen bg-white p-5 relative">
      {/* Sidebar for Categories */}
      <div className="w-1/4 bg-white p-5">
        <div className="flex items-center pb-2">
          <span className="font-bold text-xl">Danh Mục</span>
        </div>
        <div>{renderCategories(categories)}</div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col justify-between">
        <div>
        <fieldset className="border-0 p-0 m-0">
          <div className="font-bold mb-2 text-xl">Sắp xếp theo</div>
          <div className="flex gap-2 mb-4">
            <section className="flex gap-2">
              {[
                "Phổ biến",
                "Mới nhất",
                "Giá thấp đến cao",
                "Giá cao đến thấp",
              ].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 border rounded transition-colors duration-300 ${
                    selectedSortOption === option
                      ? "bg-red text-white border-red"
                      : "bg-transparent border-gray-300 text-gray-700"
                  }`}
                  onClick={() => setSelectedSortOption(option)}
                >
                  <span aria-hidden="true">{option}</span>
                </button>
              ))}
            </section>
          </div>
        </fieldset>

        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts
            .slice(0, currentPage * itemsPerPage)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                index + 1 === currentPage ? "bg-red text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
