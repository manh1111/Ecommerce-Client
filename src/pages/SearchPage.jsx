import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@widgets/Shop/ProductCard"; // Ensure this component is memoized
import { getCategories } from "@api/categorie"; // API to get categories
import { searchProduct } from "@api/product"; // Import the searchProduct function
import { useSearchProduct } from "@contexts/searchProductContext"; // Custom hook for product search

const SearchPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    sortProducts,
    loadMoreProducts,
    updateProductList,
  } = useSearchProduct();

  const [categories, setCategories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Phổ biến");
  const [priceSortOption, setPriceSortOption] = useState("Giá");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catalogData = await getCategories();
        setCategories(catalogData);
        if (catalogData.length > 0) {
          setActiveCategory(catalogData[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const searchProducts = useCallback(async (term, categoryId, page, sortBy) => {
    try {
      const data = await searchProduct({
        searchQuery: term,
        category: categoryId,
        page,
        limit: itemsPerPage,
        sortBy, // Pass the sortBy parameter
      });

      updateProductList(data.productsWithCounts || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    if (activeCategory) {
      // Determine the sortBy value based on the selected sort option
      const sortByMap = {
        "Phổ biến": "sold_count",
        "Mới nhất": "-createdAt",
        "Giá thấp đến cao": "price_asc",
        "Giá cao đến thấp": "price_desc",
      };

      const sortBy = sortByMap[selectedSortOption];
      searchProducts(searchTerm, activeCategory, currentPage, sortBy);
    }
  }, [
    searchTerm,
    activeCategory,
    currentPage,
    selectedSortOption,
    searchProducts,
  ]);

  const handleSortOptionClick = useCallback((option) => {
    setSelectedSortOption(option);
    setDropdownOpen(false);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm); // Update search term in context
      setCurrentPage(1);
    },
    [setSearchTerm]
  );

  const handleCategoryClick = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  }, []);

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
    <div className="flex flex-row w-full h-full bg-white p-5 relative">
      {/* Sidebar for Categories */}
      <div className="w-1/4 bg-white p-5">
        <div className="flex items-center pb-2">
          <span className="font-bold text-xl">Danh Mục</span>
        </div>
        <div>
          {categories.map((category) => (
            <div
              key={category._id}
              className={`flex items-center cursor-pointer py-1 ${
                activeCategory === category._id
                  ? "text-red font-bold"
                  : "text-black"
              }`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.category_name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col justify-between">
        <div>
          {/* Search Input
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            className="border p-2 mb-4 w-full"
          /> */}

          <fieldset className="border-0 p-0 m-0">
            <div className="font-bold mb-2 text-xl py-4">Sắp xếp theo</div>
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
                    onClick={() => handleSortOptionClick(option)}
                  >
                    <span aria-hidden="true">{option}</span>
                  </button>
                ))}
              </section>
              <section>
                <button
                  type="button"
                  role="combobox"
                  aria-controls="price-options"
                  aria-expanded={dropdownOpen}
                  className="flex items-center px-4 py-2 border rounded text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="mr-2">{priceSortOption}</span>
                </button>
                {dropdownOpen && (
                  <ul
                    id="price-options"
                    className="absolute mt-1 bg-white border rounded shadow-lg z-10"
                  >
                    {["Giá thấp đến cao", "Giá cao đến thấp"].map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                          onClick={() => handleSortOptionClick(option)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </fieldset>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts
            .slice(0, currentPage * itemsPerPage)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
