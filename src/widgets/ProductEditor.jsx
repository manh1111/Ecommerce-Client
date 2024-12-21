import Spring from "@components/Spring";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "@api/categorie";
import { createProduct, updateProduct, getProductById } from "@api/product"; // Import updateProduct and getProductById API functions
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { getCatalogByShopToken } from "@api/catalog ";

const ProductEditor = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      image1: [],
      productName: "",
      description: "",
      salePrice: "",
      category_id: null,
      catalog_id: null,
      qty: 0,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
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
          setValue("productName", productData.product_name);
          setValue("description", productData.product_desc);
          setValue("salePrice", productData.product_price);
          setValue("category_id", productData.category_id._id);
          setValue("catalog_id", productData.catalog_id?._id);
          setValue("qty", productData.product_quantity);

          const imageFiles = productData.product_img.map((imageUrl) => ({
            url: imageUrl,
          }));
          setImagePreviews(imageFiles);
          setValue("image1", imageFiles);
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
    const files = data.image1.filter((file) => file !== "");

    console.log(isDraft);
    try {
      const apiFunc = id ? updateProduct : createProduct;
      const response = await apiFunc({
        id,
        product_name: data.productName,
        product_desc: data.description,
        product_price: data.salePrice,
        product_quantity: data.qty,
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
      }
      console.log("Product response:", response);
    } catch (error) {
      toast.error(
        `Không thể ${
          isDraft ? "lưu sản phẩm dưới dạng bản nháp" : "xuất bản sản phẩm"
        }. Lý do: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleImageChange = (files) => {
    const fileArray = Array.from(files);
    setImagePreviews(fileArray);
    setValue("image1", fileArray);
  };

  const removeImage = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    setValue("image1", newImagePreviews);
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
          <div className="w-1/2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productName">
                Tên sản phẩm
              </label>
              <input
                className={classNames("field-input", {
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

            <div>
              <label className="field-label mb-2.5">Hình ảnh sản phẩm</label>
              <Controller
                name="image1"
                control={control}
                render={({ field }) => (
                  <div className="border-2 border-slate-200 rounded-lg p-4">
                    <label
                      htmlFor="image-upload"
                      className="btn btn-primary cursor-pointer"
                    >
                      Choose Image
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="image1"
                      onChange={(e) => handleImageChange(e.target.files)}
                      multiple
                      className="hidden"
                    />

                    <div className="image-preview-container mt-4">
                      {imagePreviews.map((image, index) => (
                        <div
                          key={index}
                          className="image-preview relative w-full h-48 border border-slate-300 rounded-lg overflow-hidden flex justify-center items-center"
                        >
                          {image ? (
                            <img
                              src={image.url || URL.createObjectURL(image)}
                              alt={`preview-${index}`}
                              className="preview-img object-cover w-full h-full cursor-pointer"
                              onClick={() => removeImage(index)}
                            />
                          ) : (
                            <label
                              htmlFor={`image-upload-${index}`}
                              className="media-dropzone w-full h-full flex justify-center items-center cursor-pointer border-2 border-dashed border-slate-300 rounded-lg"
                            >
                              <span className="text-gray-500">
                                Select Image
                              </span>
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
          </div>

          <div className="w-1/2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="qty">
                Số lượng
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.qty,
                })}
                id="qty"
                type="number"
                placeholder="Nhập số lượng"
                {...register("qty", { required: true })}
              />
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Ngành hàng
              </label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <select
                    className={classNames("field-input", {
                      "field-input--error": errors.category_id,
                    })}
                    id="category"
                    {...field}
                  >
                    <option value="">Chọn ngành hàng</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    {catalogs.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
              {!id ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleSubmit((data) =>
                    handleSubmitProduct(data, true)
                  )}
                >
                  Save as Draft
                </button>
              ) : null}

              <button className="btn btn--secondary" type="submit">
                {id ? "Update Product" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default ProductEditor;


