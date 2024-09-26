import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createShop } from "@api/shop";
import { toast } from "react-toastify";

const AddShop = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setLogo] = useState(null); // State to store the file

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shop_name: "",
      description: "",
      address: "",
      phone_number: "",
      email: "",
    },
  });

  const handleCreateShop = async (data) => {
    try {
      const formData = new FormData();
      formData.append("shop_name", data.shop_name);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);

      if (file) {
        formData.append("file", file);
      }

      console.log("Submitting formData:", formData);
      const result = await createShop(formData);
      toast.success("Shop created successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("There was a problem with the API call:", error);
      toast.error("Failed to create shop. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setLogo(file);
    } else {
      setImagePreview(null);
      setLogo(null);
    }
  };

  return (
    <div className="card ">
      <h5 className="mb-[15px]">Create Shop</h5>
      <div className="w-full flex justify-center">
        <form
          className="w-full"
          onSubmit={handleSubmit(handleCreateShop)}
        >
          <div className="flex w-full">
            <div className="w-full">
              <div>
                <span className="block field-label mb-2.5">Shop Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-4 w-[150px] h-[150px]">
                    <img
                      src={imagePreview}
                      alt="Shop Preview"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="shop_name">
                  Shop Name
                </label>
                <input
                  className="field-input"
                  id="shop_name"
                  placeholder="Enter shop name"
                  {...register("shop_name", { required: true })}
                />
                {errors.shop_name && (
                  <p className="text-red-500">Shop name is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="field-input !h-[160px] !py-[15px] !overflow-y-auto"
                  id="description"
                  placeholder="Enter shop description"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="text-red-500">Description is required</p>
                )}
              </div>
            </div>

            <div className="w-full gap-5 pl-8 mt-[55px]">
              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="field-input"
                  id="address"
                  placeholder="Enter shop address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <p className="text-red-500">Address is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="phone_number">
                  Phone Number
                </label>
                <input
                  className="field-input"
                  id="phone_number"
                  placeholder="Enter phone number"
                  {...register("phone_number", { required: true })}
                />
                {errors.phone_number && (
                  <p className="text-red-500">Phone number is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="field-input"
                  id="email"
                  placeholder="Enter shop email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red-500">Invalid email format</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end xl:col-span-2">
            <button
              className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
              type="submit"
            >
              Create Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
