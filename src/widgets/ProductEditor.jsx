import Spring from "@components/Spring";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategoriesTree } from "@api/categorie";
import { createProduct, updateProduct, getProductById } from "@api/product"; // Import updateProduct and getProductById API functions
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { getCatalogByShopToken } from "@api/catalog ";
import React from "react";
import { TreeSelect } from "antd";

const ProductEditor = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [activeCategory, setActiveCategory] = React.useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm({
    defaultValues: {
      image: [],
      productName: "",
      description: "",
      salePrice: "",
      category_id: null,
      catalog_id: null,
      product_quantity: 0,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesTree();
        setCategories(data.filter((category) => category.value !== "all"));
      } catch (error) {
        toast.error("Không thể tải danh mục");
      }
    };

    const fetchCatalogs = async () => {
      try {
        console.log("id", id)
        const data = await getCatalogByShopToken();
        setCatalogs(data);
      } catch (error) {
        toast.error("Không thể tải danh mục ngành hàng");
      }
    };

    const fetchProductData = async () => {
      if (id) {
        try {
          const productData = await getProductById(id);
          console.log("Product Data:", productData);
          setValue("product_quantity", productData.product_quantity);
          setValue("productName", productData.product_name);
          setValue("description", productData.product_desc);
          setValue("salePrice", productData.product_price);
          setValue("category_id", productData.category_id._id);
          const imageFiles = productData.product_img.map((imageUrl) => ({
            url: imageUrl,
          }));
          setImagePreviews(imageFiles);
          setValue("image", imageFiles);
          console.log("imageFiles", imageFiles)
          setValue("catalog_id", productData.catalog_id);
          
        } catch (error) {
          toast.error("Không thể tải dữ liệu sản phẩm");
        }
      }
    };    

    fetchCategories();
    fetchCatalogs();
    fetchProductData();
  }, [id, setValue]);

  const handleSubmitProduct = async (data, isDraft) => {
    console.log('data img1', data.image);
   const files = Array.isArray(data.image)
   ? data.image
       .filter((item) => item.file)
       .map((item) => item.file)   
   : [];


    try {
      const apiFunc = id ? updateProduct : createProduct;
      const response = await apiFunc({
        id,
        product_name: data.productName,
        product_desc: data.description,
        product_price: data.salePrice,
        product_quantity: data.product_quantity,
        category_id: data.category_id,
        catalog_id: data.catalog_id,
        files,
        isDraft,
        isPublic: !isDraft,
      });
  
      if (isDraft) {
        toast.info("Sản phẩm đã được lưu dưới dạng bản nháp!");
      } else {
        toast.success(
          `Sản phẩm đã ${id ? "cập nhật" : "xuất bản"} thành công!`
        );
        reset();
        setImagePreviews()
      }
    } catch (error) {
      toast.error(
        `Không thể ${
          isDraft ? "lưu sản phẩm dưới dạng bản nháp" : "xuất bản sản phẩm"
        }. Lý do: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleOptionsTreeData = (categories) => {
    const mapCategoryToTreeData = (category) => {
      const hasChildren = category.children && category.children.length > 0;
      return {
        title: category.category_name,
        value: category._id,
        children: category.children?.map(mapCategoryToTreeData) || [],
        selectable: !hasChildren
      };
    };
  
    return categories.map(mapCategoryToTreeData);
  }

  const handleImageChange = (files) => {
    const fileArray = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  
    setImagePreviews((prev) => [...prev, ...fileArray]);
    const currentImages = getValues("image") || []; 
    setValue("image", [...currentImages, ...fileArray]);
  };  

  const removeImage = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    setValue("image", newImagePreviews);
  };  

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">
        {id ? "Chỉnh sửa sản phẩm" : "Cài đặt sản phẩm"}
      </h5>
      <form
        className="grid gap-5"
        onSubmit={handleSubmit((data) => handleSubmitProduct(data, false))}
      >
        <div className="flex flex-row w-full gap-4">
          <div className="w-1/2 flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productName">
                Tên sản phẩm
              </label>
              <input
                className={classNames("field-input py-2", {
                  "field-input--error": errors.productName,
                })}
                id="productName"
                placeholder="Nhập tên sản phẩm"
                {...register("productName", { required: true })}
              />
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Mô tả
              </label>
              <textarea
                className={classNames("field-input", {
                  "field-input--error": errors.description,
                })}
                id="description"
                placeholder="Nhập mô tả"
                style={{ height: "176px" }} 
                {...register("description", { required: true })}
              />
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="salePrice">
                Giá bán
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.salePrice,
                })}
                id="salePrice"
                type="number"
                placeholder="Nhập giá bán"
                {...register("salePrice", { required: true })}
              />
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="product_quantity">
                Số lượng
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.product_quantity,
                })}
                id="product_quantity"
                type="number"
                placeholder="Nhập số lượng"
                {...register("product_quantity", { required: true })}
              />
            </div>
            
          </div>

          <div className="w-1/2 flex flex-col gap-4">
          <div className="field-wrapper mb-4">
            <label className="field-label" htmlFor="catalog_id">
              Ngành hàng
            </label>
            <Controller
              name="catalog_id"
              control={control}
              rules={{ required: "Vui lòng chọn danh mục" }}
              render={({ field }) => (
                <TreeSelect 
                  placeholder='Chọn ngành hàng'
                  treeData={handleOptionsTreeData(categories)}
                  style={{ height: 44 }}
                  onChange={(value)=>    setValue("category_id", value)}
                />
              )}
            />
            {errors.catalog_id && (
              <span className="error-message">Vui lòng chọn danh mục</span>
            )}
          </div>


            <div>
              <label className="field-label mb-2.5">Hình ảnh sản phẩm</label>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <div className="border-2 border-slate-200 rounded-lg p-4">
                    <label
                      htmlFor="image-upload"
                      className="btn btn-primary cursor-pointer"
                    >
                      Chọn hình ảnh
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files)}
                      className="hidden"
                    />

                    <div className="image-preview-container grid grid-cols-2 gap-4 mt-4 min-h-20">
                      {imagePreviews?.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-full h-48 border border-slate-300 rounded-lg overflow-hidden flex justify-center items-center"
                        >
                          {image ? (
                            <>
                              <img
                                src={image.url || URL.createObjectURL(image)}
                                alt={`preview-${index}`}
                                className="object-cover w-full h-full cursor-pointer"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                onClick={() => removeImage(index)}
                              >
                                &times;
                              </button>
                            </>
                          ) : (
                            <label
                              htmlFor={`image-upload-${index}`}
                              className="media-dropzone w-full h-full flex justify-center items-center cursor-pointer border-2 border-dashed border-slate-300 rounded-lg"
                            >
                              <span className="text-gray-500">Thêm hình ảnh</span>
                              <input
                                id={`image-upload-${index}`}
                                type="file"
                                name={`image${index + 1}`}
                                onChange={(e) =>
                                  handleImageChange(e.target.files)
                                }
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="catalog">
                Danh mục
              </label>
              <Controller
                name="catalog_id"
                control={control}
                render={({ field }) => (
                  <select
                    className={classNames("field-input", {
                      "field-input--error": errors.catalog_id,
                    })}
                    id="catalog"
                    {...field}
                  >
                    <option value="">Chọn danh mục</option>
                    {catalogs.map((catalog) => (
                      <option key={catalog._id} value={catalog._id}>
                        {catalog.catalog_name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-14">
              {!id ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleSubmit((data) =>
                    handleSubmitProduct(data, true)
                  )}
                >
                  Tạo bản nháp
                </button>
              ) : null}

              <button className="btn btn--secondary" type="submit">
                {id ? "Cập nhật" : "Xuất bản"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default ProductEditor;


