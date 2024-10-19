import React, { useEffect, useState } from "react";
import ProductCard from "@widgets/Shop/ProductCard";
import { getCategories } from "@api/categorie";
import { useSearchProduct } from "@contexts/searchProductContext";
const SearchPage = () => {
  const {
    searchTerm,
    searchProducts,
    filteredProducts,
    filterByCategory,
    sortProducts,
    loadMoreProducts,
  } = useSearchProduct();

  const [categories, setCategories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Phổ biến");
  const [priceSortOption, setPriceSortOption] = useState("Giá");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeCategory, setActiveCategory] = useState(null);

  console.log("filteredProducts", filteredProducts);
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  useEffect(() => {
    // Fetch categories from API
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

  const handleSortOptionClick = (option) => {
    setPriceSortOption(option);
    sortProducts(option === "Giá thấp đến cao" ? "price-asc" : "price-desc");
    setDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    searchProducts(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > currentPage) {
      loadMoreProducts(newPage);
    }
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-row w-full h-full bg-white p-5 relative">
      {/* Sidebar for Categories */}
      <div className="w-1/3 bg-white p-5">
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
              onClick={() => {
                setActiveCategory(category._id);
                filterByCategory(category._id);
              }}
            >
              {truncateText(category.category_name, 25)}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col justify-between">
        <div>
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            className="border p-2 mb-4 w-full"
          />

          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Sắp xếp theo</legend>
            <div className="font-bold mb-2 text-base">Sắp xếp theo</div>
            <div className="flex gap-2 mb-4">
              <section className="flex gap-2">
                {["Phổ biến", "Mới nhất", "Bán chạy"].map((option) => (
                  <button
                    key={option}
                    aria-label={option}
                    aria-pressed={selectedSortOption === option}
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
              <section>
                <button
                  type="button"
                  role="combobox"
                  aria-controls="price-options"
                  aria-expanded={dropdownOpen}
                  aria-autocomplete="none"
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
                          className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
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

          {/* Products List */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-l bg-gray-200 hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="flex items-center px-4">{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-r bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
