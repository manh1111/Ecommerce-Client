import { useEffect, useState } from "react";
import Select from "@ui/Select";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Spring from "@components/Spring";
import dayjs from "dayjs";
import {
  PROMOTIONAL_OPTIONS,
  STOCK_STATUS_OPTIONS,
  UNITS_OPTIONS,
} from "@constants/options";

import { createCategories, getCategories } from "@api/categorie";

const ProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch all categories from API
  // Fetch all categories from API
  // Fetch all categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const formattedCategories = fetchedCategories.map((category) => ({
          label: category.name,
          value: category.id,
        }));
        setCategories(formattedCategories);
        setIsCategoryEmpty(formattedCategories.length === 0);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  // Tạo danh mục mới
  const handleCreateCategory = async () => {
    if (!newCategoryName) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      const newCategory = await createCategories({ name: newCategoryName });
      const formattedCategory = {
        label: newCategory.name,
        value: newCategory.id,
      };
      setCategories([...categories, formattedCategory]);
      setIsCategoryEmpty(false);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const defaultValues = {
    productName: "Tên sản phẩm",
    description: "Mô tả sản phẩm ở đây...",
    category: categories[0] || "",
    regularPrice: 1000,
    salePrice: 800,
    productSchedule: [dayjs().startOf("week"), dayjs().endOf("week")],
    promoType: PROMOTIONAL_OPTIONS[0],
    stockStatus: STOCK_STATUS_OPTIONS[0],
    qty: 100,
    unit: UNITS_OPTIONS[0],
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const handlePublish = (data) => {
    if (isCategoryEmpty) {
      toast.error("Please create a category before publishing the product");
      return;
    }
    console.log(data);
    toast.success("Product published successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">Product Settings</h5>
      <form className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-10">
        <div>
          Product Name
          <div className="field-wrapper">
            <label className="field-label" htmlFor="productName">
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="productName"
              className="field-input"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <p className="error-message">Vui lòng nhập tên sản phẩm.</p>
            )}
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="description">
              Mô tả sản phẩm
            </label>
            <textarea
              id="description"
              className="field-input"
              rows="4"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="error-message">Vui lòng nhập mô tả sản phẩm.</p>
            )}
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="category">
              Category
            </label>
            {isCategoryEmpty ? (
              <div>
                <p>No categories available. Please create a category first.</p>
                <input
                  type="text"
                  placeholder="Enter new category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="field-input"
                />
                <button
                  type="button"
                  className="btn btn--secondary mt-2"
                  onClick={handleCreateCategory}
                >
                  Create Category
                </button>
              </div>
            ) : (
              <Controller
                name="category"
                control={control}
                defaultValue={defaultValues.category}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    id="category"
                    placeholder="Select category"
                    options={categories}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            )}
          </div>
        </div>

        <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
          <button
            className="btn btn--secondary"
            onClick={handleSubmit(handlePublish)}
          >
            Publish Product
          </button>
        </div>
      </form>
    </Spring>
  );
};

export default ProductCreate;
