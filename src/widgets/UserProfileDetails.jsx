import Spring from "@components/Spring";
import ChangePasswordModal from "@components/ChangePasswordModal";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { getCookie } from "@utils/cookie";
import { GetOwnShop } from "@api/shop";
import { changePassword, getProfileOwn } from "@api/profile";
import { WEB_DOMAIN, URL_API } from "../config/config";
import axiosInstance from "@api/axiosInstance";

const UserProfileDetails = () => {
  // const navigate = useNavigate();
  // const [cities, setCities] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [userInfo, setUserInfo] = useState({}); // Initialize as an empty object
  // const [showShopDetails, setShowShopDetails] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profileDetail')

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = JSON.parse(getCookie('user_login'));
    console.log(token)
    console.log(token.replace(/\\/g, ""))
    if (token) {
      try {
        // const decodedToken = jwtDecode(token);
        const userData = await getProfileOwn();
        setUserInfo(userData);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      phone: "",
      country: null,
      city: "",
      shopName: "",
      pickupAddress: "",
      sellerEmail: "",
      sellerPhone: "",
    },
  });

  useEffect(() => {
    if (userInfo?.roles?.some((role) => role.roleName === "shop")) {
      const fetchShopData = async () => {
        try {
          const response = await GetOwnShop();
          if (response) {
            setShopData(response);
            populateShopFields(response);
          } else {
            setShopData(null);
            populateUserFields(userInfo);
          }
        } catch (error) {
          console.error("Error fetching shop data", error);
          populateUserFields(userInfo);
        }
      };

      fetchShopData();
    } else {
      populateUserFields(userInfo);
    }
  }, [userInfo]);

  const populateShopFields = (shopData) => {
    setValue("shopName", shopData.shop_name || "");
    setValue("pickupAddress", shopData.address || "");
    setValue("sellerEmail", shopData.owner_id.email || "");
    setValue("sellerPhone", shopData.phone_number || "");
    setValue("userName", shopData.owner_id.userName || "");
    setValue("email", shopData.owner_id.email || "");
    setValue("phone", shopData.owner_id.phoneNumber || "");
  };

  const populateUserFields = (userInfo) => {
    console.log("userInfo", userInfo);
    setValue("userName", userInfo.userName || "");
    setValue("email", userInfo.email || "");
    setValue("phone", userInfo.phoneNumber || "");
    setValue("shopName", "");
    setValue("Address", userInfo ? userInfo.address || "" : "");
    setValue("sellerEmail", "");
    setValue("sellerPhone", "");
  }

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Profile updated successfully");
  };

  const handlePasswordSubmit = async (passwordData) => {
    try {
      const { currentPassword, newPassword } = passwordData;
      const res = await changePassword(currentPassword, newPassword);
      console.log("Password change response:", res);
      toast.success("Password changed successfully");
      setShowPasswordModal(false);

    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
    }
  };

  const roleNames = userInfo?.roles?.map((role) => role.roleName) || [];


  const tabs = [
    {
      name: 'profileDetail',
      element: <div className="flex flex-col gap-5">
        <h5>Chi tiết thông tin</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-1 md:gap-5">
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="userName">
                  Họ và tên
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.userName,
                  })}
                  type="text"
                  id="userName"
                  placeholder={userInfo.userName || "Name"}
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <p className="error-message">
                    Họ và tên không được để trống
                  </p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="email">
                  Email
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.email,
                  })}
                  type="text"
                  id="email"
                  placeholder={userInfo.email || "Email"}
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <p className="error-message">Email không hợp lệ</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="phone">
                  Số điện thoại
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      value={field.value}
                      format="+#-###-###-####"
                      placeholder={userInfo.phoneNumber || "Phone Number"}
                      className={classNames("field-input", {
                        "field-input--error": errors.phone,
                      })}
                      getInputRef={field.ref}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="error-message">
                    Số điện thoại không được để trống
                  </p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="gender">
                  Giới tính
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Nam</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Nữ</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Other"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Khác</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="error-message">Chọn giới tính</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="dob">
                  Ngày sinh
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.dob,
                  })}
                  type="date"
                  id="dob"
                  placeholder="Date of Birth"
                  {...register("dob", { required: true })}
                />
                {errors.dob && (
                  <p className="error-message">Nhập ngày sinh</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2.5 w-full">
            <div className="flex w-full justify-between mt-2.5">
              <button
                className="text-red font-bold"
                onClick={(e) => {
                  e.preventDefault()
                  setShowPasswordModal(true)
                  console.log(123123)
                }} // Show modal on click
              >
                Đổi mật khẩu
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <button
                className="btn btn--primary mt-5 w-[260px]"
                type="submit"
              >
                Cập nhật thông tin
              </button>
            </form>
          </div>
        </form>
      </div>
    },
    {
      name: 'shopDetail',
      element: <div className="flex flex-col gap-5">
        <h5>Thông tin</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-1 md:gap-5">
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="shopName">
                  Tên cửa hàng
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.shopName,
                  })}
                  type="text"
                  id="shopName"
                  placeholder={shopData?.shop_name || "Shop Name"}
                  {...register("shopName", { required: true })}
                />
                {errors.shopName && (
                  <p className="error-message">Nhập tên cửa hàng</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="pickupAddress">
                  Địa chỉ lấy hàng
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.pickupAddress,
                  })}
                  type="text"
                  id="pickupAddress"
                  placeholder={shopData?.address || "Pickup Address"}
                  {...register("pickupAddress", { required: true })}
                />
                {errors.pickupAddress && (
                  <p className="error-message">Nhập địa chỉ lấy hàng</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="sellerEmail">
                  Email cửa hàng
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.sellerEmail,
                  })}
                  type="text"
                  id="sellerEmail"
                  placeholder={shopData?.owner_id.email || "Seller Email"}
                  {...register("sellerEmail", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.sellerEmail && (
                  <p className="error-message">Email không hợp lệ</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="sellerPhone">
                  Số điện thoại cửa hàng
                </label>
                <Controller
                  name="sellerPhone"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      value={field.value}
                      format="+#-###-###-####"
                      placeholder={
                        shopData?.owner_id.phoneNumber || "Seller Phone"
                      }
                      className={classNames("field-input", {
                        "field-input--error": errors.sellerPhone,
                      })}
                      getInputRef={field.ref}
                    />
                  )}
                />
                {errors.sellerPhone && (
                  <p className="error-message">Số điện thoại băts buộc</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2.5">
            <button
              className="btn btn--primary w-full mt-5 md:w-fit "
              type="submit"
            >
              Thay đổi thông tin
            </button>
          </div>
        </form>
      </div>
    }
  ]

  return (
    <Spring className="card flex flex-col gap-[30px] md:gap-12 md:row-start-2 md:col-span-2 md:!pb-[50px] xl:row-start-1 xl:col-start-2 xl:col-span-1">
      {tabs.map(tab => (
        tab.name === activeTab && tab.element
      ))}
      {roleNames.includes("shop") && (
        <>
          <div className="flex justify-end">
            {activeTab === 'profileDetail' ? (
              <div className="flex flex-col gap-4 items-end">
                <button
                  onClick={() => setActiveTab('shopDetail')}
                  className="text-btn"
                >
                  Chi tiết cửa hàng của bạn
                </button>
                <button
                  onClick={() => window.open(`${WEB_DOMAIN}/shop/statistical`, '_blank')}
                  className="text-btn"
                >
                  Quản lý cửa hàng
                </button>

              </div>
            ) : (
              <button
                onClick={() => setActiveTab('profileDetail')}
                className="text-btn"
              >
                Chi tiết thông tin cá nhân
              </button>
            )}
          </div>
        </>
      )}
      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
      />
    </Spring>
  );
};

export default UserProfileDetails;
