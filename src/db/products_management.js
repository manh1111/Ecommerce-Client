import { GetAllProduct } from "@api/product";

let Products = [];

const fetchProducts = async (category) => {
  try {
    const isPublic = category === "publish";
    const isDraft = category === "drafted";
    const isDeleted = category === "deleted";

    const fetchedProducts = await GetAllProduct(isPublic, isDraft, isDeleted);

    Products = fetchedProducts.data.productsWithCounts.map((product) => {
      const skuFallback = product._id.slice(-3);

      return {
        id: product._id,
        sku: product.sku || `SKU-${skuFallback}`,
        image: product.product_img?.[0] || "",
        name: product.product_name,
        stock: product.product_quantity || 0,
        price: product.product_price || 0,
        category: product.category_id?.category_name || "Chưa có",
        rateCount: product.avgRating,
        date: product.createdAt || new Date().toISOString(),
        status: product.isPublic ? "publish" : product.isDeleted  ? "deleted" : "drafted",
      };
    });
  } catch (error) {
    console.error("Error fetching products data:", error);
  }
};

const setProducts = async (category) => {
  await fetchProducts(category);
};

const getProducts = () => Products;

export { setProducts, fetchProducts };
export default getProducts;
