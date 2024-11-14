import { GetAllProduct } from "@api/product";

let Products = [];

const fetchProducts = async () => {
  try {
    const fetchedProducts = await GetAllProduct();
    
    Products = fetchedProducts.data.productsWithCounts.map((product) => {
      const skuFallback = product._id.slice(-3); 

      return {
        id: product._id,
        sku: product.sku || `SKU-${skuFallback}`,
        image: product.product_img?.[0] || "",
        name: product.product_name,
        stock: product.product_quantity || 0,
        price: product.product_price || 0,
        category: product.category_id?.category_name  || "Chưa có",
        rateCount: product.avgRating || Math.floor(Math.random() * 5) + 1,
        date: product.createdAt || new Date().toISOString(),
        status: product.isPublic ? "publish" : "draft",
      };
    });
  } catch (error) {
    console.error("Error fetching products data:", error);
  }
};

fetchProducts();

const getProducts = () => Products;

export { fetchProducts };
export default getProducts;
