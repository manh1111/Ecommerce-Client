import { createContext, useContext, useEffect, useState } from "react";
import { GetAllProduct } from "@api/product";
import Loading from "@components/Loading";

const SearchProductContext = createContext(undefined);

export const SearchProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const data = await GetAllProduct();
          const products = data.data.productsWithCounts.map((product) => ({
            id: product._id,
            imageSrc: product.product_img[0],
            altText: product.product_name,
            price: `${product.product_price.toLocaleString()} VND`,
            discount: "0%",
            rating: 4.8,
            soldCount: product.product_quantity,
            promotionText: "Khuyến mãi đặc biệt",
            voucherText: "Giảm giá",
            promotionOverlaySrc: "https://example.com/overlay.png",
          }));
          
            setProducts(products);
            setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    fetchProducts();
  }, []);

  // Search for products based on the search term
  const searchProducts = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Filter products by category
  const filterByCategory = (category) => {
    const filtered = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  };

  // Sort products based on the selected criteria
  const sortProducts = (type) => {
    let sortedProducts = [...filteredProducts];
    if (type === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  // Reset filters to show all products
  const resetFilters = () => {
    setFilteredProducts(products);
    setSearchTerm(""); // Optional: Reset search term as well
  };

  // Load more products for pagination
  const loadMoreProducts = async (pageNumber) => {
    setLoading(true); // Set loading before fetching more products
    try {
      const response = await fetch(`/api/products?page=${pageNumber}`);
      const newProducts = await response.json();
      setProducts((prev) => [...prev, ...newProducts]);
      setFilteredProducts((prev) => [...prev, ...newProducts]);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  return (
    <SearchProductContext.Provider
      value={{
        searchTerm,
        searchProducts,
        filteredProducts,
        filterByCategory,
        sortProducts,
        resetFilters,
        loadMoreProducts,
        loading, // Expose loading state to consumers
      }}
    >
      {loading ? <Loading /> : children}{" "}
      {/* Show loading indicator */}
    </SearchProductContext.Provider>
  );
};

// Custom hook to use the SearchProductContext
export const useSearchProduct = () => useContext(SearchProductContext);
