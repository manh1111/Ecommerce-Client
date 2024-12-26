import axiosInstance from "@api/axiosInstance";
import { checkToken } from "@utils/auth";
import { URL_API } from "../config/config";

// Get the base API URL from environment variables

export const getCatalogByShopId = async (ShopId) => {
  try {

    const response = await axiosInstance.get(
      `${URL_API}catalogShop/shop/${ShopId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getCatalogByShopToken = async () => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.get(
      `${URL_API}catalogShop/shop-owner`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};


export const updateCatalog = async (
  catalogId,
  { catalogName, catalogDescription }
) => {
  try {
    const formData = new FormData();
    formData.append("catalogName", catalogName);
    formData.append("catalogDescription", catalogDescription || "");

    const config = checkToken("multipart/form-data");
    const response = await axiosInstance.put(
      `${URL_API}catalogShop/${catalogId}`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw error;
  }
};

export const deleteCatalog = async (catalogId) => {
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.delete(
      `${URL_API}catalogShop/${catalogId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
};

export const createCatalogs = async (catalogName, catalogDescription) => {
  console.log(
    "catalogName, catalogDescription",
    catalogName,
    catalogDescription
  );
  try {
    const config = checkToken("application/json");
    const response = await axiosInstance.post(
      `${URL_API}catalogShop`,
      {
        catalogName,
        catalogDescription,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw error;
  }
};


export const getCatalogs = async () => {
  const config = checkToken("application/json");
  try {
    const response = await axiosInstance.get(
      `${URL_API}catalogShop/shop-owner`,
      config 
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};



