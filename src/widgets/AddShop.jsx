import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createShop } from "@api/shop";
import { refreshAccessToken } from '@api/auth'
import { toast } from "react-toastify";
import { getCookie, setCookie } from "@utils/cookie";
import {
  CHANGE_VALUE_TOKEN,
  CHANGE_STATUS_AUTH
} from "@redux/slice/auth/authSlice";
import { useDispatch } from "react-redux";
import { WEB_DOMAIN } from "../config/config";

const AddShop = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setLogo] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      await createShop(formData);
      toast.success("Tạo cửa hàng thành công!", {
        autoClose: 1000,
      });
      reset()
      await callToRefreshToken()
      window.open(`${WEB_DOMAIN}/shop/statistical`, '_blank')
    } catch (error) {
      toast.error("Tạo cửa hàng thất bại. Vui lòng thử lại.", {
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

  const callToRefreshToken = async () => {
    const rfToken = JSON.parse(getCookie('refresh_token'))
    const { accessToken, refreshToken } = await refreshAccessToken(rfToken)
    dispatch(CHANGE_VALUE_TOKEN(accessToken));
    setCookie("token", accessToken, 3);
    setCookie("refresh_token", refreshToken, 3);
    setCookie("user_login", accessToken);
  }

  return (
    <div className="card">
      <h5 className="mb-[15px]">Tạo cửa hàng</h5>
      <div className="w-full flex justify-center">
        <form className="w-full" onSubmit={handleSubmit(handleCreateShop)}>
          <div className="flex w-full">
            <div className="w-full">
              <div>
                <span className="block field-label mb-2.5">Ảnh cửa hàng</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-4 w-[150px] h-[150px]">
                    <img
                      src={imagePreview}
                      alt="Ảnh cửa hàng"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="shop_name">
                  Tên cửa hàng
                </label>
                <input
                  className="field-input"
                  id="shop_name"
                  placeholder="Nhập tên cửa hàng"
                  {...register("shop_name", { required: true })}
                />
                {errors.shop_name && (
                  <p className="text-rose-500">Tên cửa hàng là bắt buộc</p>
                )}
              </div>

              <div className="field-wrapper">
                <label
                  className="field-label text-lg pt-2"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  className="field-input !h-[160px] !py-[15px] !overflow-y-auto"
                  id="description"
                  placeholder="Nhập mô tả cửa hàng"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="text-rose-500">Mô tả là bắt buộc</p>
                )}
              </div>
            </div>

            <div className="w-full gap-5 pl-8 mt-[55px]">
              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  className="field-input"
                  id="address"
                  placeholder="Nhập địa chỉ cửa hàng"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <p className="text-rose-500">Địa chỉ là bắt buộc</p>
                )}
              </div>

              <div className="field-wrapper">
                <label
                  className="field-label text-lg pt-2"
                  htmlFor="phone_number"
                >
                  Số điện thoại
                </label>
                <input
                  className="field-input"
                  id="phone_number"
                  placeholder="Nhập số điện thoại"
                  {...register("phone_number", { required: true })}
                />
                {errors.phone_number && (
                  <p className="text-rose-500">Số điện thoại là bắt buộc</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label text-lg pt-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="field-input"
                  id="email"
                  placeholder="Nhập email cửa hàng"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-rose-500">Email là bắt buộc</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-rose-500">Định dạng email không hợp lệ</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end xl:col-span-2">
            <button
              className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
              type="submit"
            >
              Tạo cửa hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
