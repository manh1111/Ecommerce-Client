import axiosInstance from "../api/axiosInstance";
import { checkToken } from "@utils/auth";

import { URL_API } from "../../src/config/config";

export const GetAllProduct = async (isPublic = true, isDraft, isDeleted) => {
  try {
    const config = checkToken("application/json");
    const queryParams = new URLSearchParams();

    if (isPublic !== undefined && isPublic !== null) {
      {
        isPublic && queryParams.append("isPublic", isPublic);
      }
    }
    if (isDraft !== undefined && isDraft !== null) {
      {
        isDraft && queryParams.append("isDraft", isDraft);
      }
    }
    if (isDeleted !== undefined && isDeleted !== null) {
      {
        isDeleted && queryParams.append("isDeleted", isDeleted);
      }
    }

    // Construct the API URL with the query parameters
    const response = await axiosInstance.get(
      `${URL_API}product/shop-owners?${queryParams.toString()}`,
      config
    );

    return response;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`${URL_API}product/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const deletePermanentlyProducts = async (ids) => {
  try {
    const config = checkToken();
    const result = await axiosInstance.delete(
      `${URL_API}product/delete-permanently`,
      {
        ...config,
        data: { ids: ids },
      }
    );

    console.log("result", result);

    return result.data;
  } catch (error) {
    console.error("Error delete Permanently Products products:", error);
    throw error;
  }
};

export const getProductsByCatalogShop = async (shopId, catalogId) => {
  try {
    const config = checkToken("application/json");

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${URL_API}product/shop/${shopId}/catalog/${catalogId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getAllProductsShopId = async (shopId) => {
  try {
    const config = checkToken("application/json");

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${URL_API}product/shop/${shopId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const searchProduct = async ({
  searchQuery = "",
  category = "",
  page = 1,
  limit = 10,
  sortBy = "-createdAt",
}) => {
  const result = await axiosInstance.post(
    `${URL_API}product/search?searchQuery=${searchQuery}&category=${category}&sortBy=${sortBy}`,
    {
      searchQuery,
      category,
      page,
      limit,
      sortBy,
    }
  );
  return result.data;
};

export const createProduct = async ({
  product_name,
  product_desc,
  product_price,
  product_quantity,
  category_id,
  catalog_id,
  files,
  isDraft = false,
  isPublic = false,
}) => {
  try {
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_desc", product_desc);
    formData.append("product_price", product_price);
    formData.append("product_quantity", product_quantity);
    formData.append("category_id", category_id);
    formData.append("catalog_id", catalog_id);

    // Append each file to formData
    files.forEach((file) => formData.append("files", file));

    // Append publication status
    if (isDraft) formData.append("isDraft", "true");
    if (isPublic) formData.append("isPublic", "true");

    const config = checkToken("multipart/form-data");
    const response = await axiosInstance.post(
      `${URL_API}product`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async ({
  id,
  product_name,
  product_desc,
  product_price,
  product_quantity,
  category_id,
  files = [],
}) => {
  try {
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_desc", product_desc);
    formData.append("product_price", product_price);
    formData.append("product_quantity", product_quantity);
    formData.append("category_id", category_id);

    // Append each file to formData if there are any files
    files.forEach((file) => formData.append("product_img", file));

    const config = checkToken("multipart/form-data");
    const response = await axiosInstance.put(
      `${URL_API}product/${id}`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// In your API file (e.g., product.js)

export const deleteProducts = async (ids) => {
  try {
    const config = checkToken();
    const result = await axiosInstance.delete(`${URL_API}product`, {
      ...config,
      data: { ids: ids },
    });

    console.log("result", result);

    return result.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};

export const publishProducts = async (ids) => {
  try {
    const config = checkToken("application/json");

    const requestBody = { ids: ids };

    const response = await axiosInstance.post(
      `${URL_API}product/public`,
      requestBody,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error publishing products:", error);
    throw error;
  }
};

export const countProducts = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(
      `${URL_API}product/shop/countProduct`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error publishing products:", error);
    throw error;
  }
};


export const getAllProductsCategoryId = async (categoryId) => {
  try {
    // const config = checkToken("application/json");

    // Fetch product by ID with token in Authorization header
    const response = await axiosInstance.get(
      `${URL_API}product/category/${categoryId}`,
      // config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};