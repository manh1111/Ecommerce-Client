import { createContext, useContext, useEffect, useState } from "react";
import { GetAllProduct, searchProduct } from "@api/product";
import Loading from "@components/Loading";

const SearchProductContext = createContext(undefined);

export const SearchProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetAllProduct();
        const productsWithCounts = response.data.productsWithCounts || [];

        const products = productsWithCounts.map((product) => ({
          id: product._id,
          imageSrc: product.product_img[0] || "",
          altText: product.product_name,
          price: `${product.product_price.toLocaleString()} VND`,
          discount: "0%",
          rating: product.product_rating || 0,
          soldCount: product.product_quantity,
          promotionText: product.promotionText || "Khuyến mãi đặc biệt",
          voucherText: product.voucherText || "Giảm giá",
          promotionOverlaySrc:
            product.promotionOverlaySrc || "https://example.com/overlay.png",
        }));

        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const searchProducts = async (searchQuery, categoryId) => {
    setSearchTerm(searchQuery);
    setLoading(true);

    try {
      // If the search query is empty, reset filtered products
      if (searchQuery.trim() === "") {
        setFilteredProducts(products);
        return;
      }

      // Fetch filtered products based on the search query and category
      const response = await searchProduct({ searchQuery, categoryId });
      if (
        response.productsWithCounts &&
        Array.isArray(response.productsWithCounts)
      ) {
        const productsData = response.productsWithCounts;

        const products = productsData.map((product) => ({
          id: product._id,
          imageSrc: product.product_img[0] || "",
          altText: product.product_name,
          price: `${product.product_price.toLocaleString()} VND`,
          discount: "0%",
          rating: product.product_rating || 0,
          soldCount: product.product_quantity,
          promotionText: product.promotionText || "",
          voucherText: product.voucherText || "",
          promotionOverlaySrc: product.promotionOverlaySrc || "",
        }));

        console.log("response", products);
        setFilteredProducts(products); // Update filtered products based on search
      } else {
        console.warn("Unexpected response structure:", response.data);
        setFilteredProducts([]); // Reset filtered products if response is unexpected
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setFilteredProducts([]); // Reset filtered products in case of error
    } finally {
      setLoading(false);
    }
  };

  // Function to update the product list
  const updateProductList = (newProducts) => {
    const products = newProducts.map((product) => ({
      id: product._id,
      imageSrc: product.product_img[0] || "",
      altText: product.product_name,
      price: `${product.product_price.toLocaleString()} VND`,
      discount: "0%",
      rating: product.product_rating || 0,
      soldCount: product.product_quantity,
      promotionText: product.promotionText || "Khuyến mãi đặc biệt",
      voucherText: product.voucherText || "Giảm giá",
      promotionOverlaySrc:
        product.promotionOverlaySrc || "https://example.com/overlay.png",
    }));

    setProducts(products);
    setFilteredProducts(products); // Update filtered products to show new list
  };

  return (
    <SearchProductContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchProducts,
        filteredProducts,
        loading,
        updateProductList, // Expose the new function
      }}
    >
      {loading ? <Loading /> : children}
    </SearchProductContext.Provider>
  );
};

export const useSearchProduct = () => useContext(SearchProductContext);
