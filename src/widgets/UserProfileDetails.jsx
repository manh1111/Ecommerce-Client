import Spring from "@components/Spring";
import { useForm, Controller } from "react-hook-form";
import Select from "@ui/Select";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";

// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// utils
import classNames from "classnames";
import countryList from "react-select-country-list";
import { City } from "country-state-city";
import { getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";
import { GetOwnShop } from "@api/shop";

const UserProfileDetails = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [userInfo, setUserInfo] = useState({}); // Initialize as an empty object
  const [showShopDetails, setShowShopDetails] = useState(false);

  useEffect(() => {
    const token = getCookie("user_login");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

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
    if (userInfo?.roleNames?.includes("shop")) {
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

    const country = countryList()
      .getData()
      .find((c) => c.value === shopData.owner_id.countryCode);
    if (country) {
      setSelectedCountry(country);
      handleCountryChange(country);
    }
  };

  const populateUserFields = (userInfo) => {
    setValue("userName", userInfo.userName || "");
    setValue("email", userInfo.email || "");
    setValue("phone", userInfo.phoneNumber || "");
    setValue("shopName", "");
    setValue("pickupAddress", "");
    setValue("sellerEmail", "");
    setValue("sellerPhone", "");
  };

  const getCountriesOptions = () => {
    let countries = countryList().getData();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].value === "RU") {
        countries[i].label = "Russia [terrorist state]";
      }
    }
    return countries;
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const rawData = City.getCitiesOfCountry(country.value);
    const options = rawData.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    setCities(options);
    setSelectedCity(null);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Profile updated successfully");
  };

  const roleNames = userInfo?.roleNames || [];

  return (
    <Spring className="card flex flex-col gap-[30px] md:gap-12 md:row-start-2 md:col-span-2 md:!pb-[50px] xl:row-start-1 xl:col-start-2 xl:col-span-1">
      {
        !showShopDetails &&
        <div className="flex flex-col gap-5">
        <h5>My Profile Details</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-1 md:gap-5">
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="userName">
                  Name
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
                  <p className="error-message">Name is required</p>
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
                  <p className="error-message">Valid email is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="phone">
                  Phone Number
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
                  <p className="error-message">Phone number is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="gender">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Other"
                      {...register("gender", { required: true })}
                      className="field-radio"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="error-message">Gender is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="dob">
                  Date of Birth
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
                  <p className="error-message">Date of birth is required</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2.5">
            <button className="text-btn" type="button">
              Change Password
            </button>
            <button
              className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>}

      {roleNames.includes("shop") && (
        <>
          <div className="flex justify-end">
            <button
              className="btn btn--secondary mt-5 w-1/3"
              onClick={() => setShowShopDetails(!showShopDetails)}
            >
              {showShopDetails
                ? "Switch to Profile Details"
                : "Switch to Shop Details"}
            </button>
          </div>
          {showShopDetails && (
            <div className="mt-5">
              <h5>Shop Information</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="field-wrapper">
                    <label className="field-label" htmlFor="shopName">
                      Shop Name
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
                      <p className="error-message">Shop name is required</p>
                    )}
                  </div>

                  <div className="field-wrapper">
                    <label className="field-label" htmlFor="pickupAddress">
                      Pickup Address
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
                      <p className="error-message">
                        Pickup address is required
                      </p>
                    )}
                  </div>

                  <div className="field-wrapper">
                    <label className="field-label" htmlFor="sellerEmail">
                      Seller Email
                    </label>
                    <input
                      className={classNames("field-input", {
                        "field-input--error": errors.sellerEmail,
                      })}
                      type="text"
                      id="sellerEmail"
                      placeholder={shopData?.owner_id?.email || "Seller Email"}
                      {...register("sellerEmail", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    {errors.sellerEmail && (
                      <p className="error-message">
                        Valid seller email is required
                      </p>
                    )}
                  </div>

                  <div className="field-wrapper">
                    <label className="field-label" htmlFor="sellerPhone">
                      Seller Phone Number
                    </label>
                    <Controller
                      name="sellerPhone"
                      control={control}
                      render={({ field }) => (
                        <PatternFormat
                          value={field.value}
                          format="+#-###-###-####"
                          placeholder={
                            shopData?.phone_number || "Seller Phone Number"
                          }
                          className={classNames("field-input", {
                            "field-input--error": errors.sellerPhone,
                          })}
                          getInputRef={field.ref}
                        />
                      )}
                    />
                    {errors.sellerPhone && (
                      <p className="error-message">
                        Seller phone number is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-2.5">
                  <button className="text-btn" type="button">
                    Change Shop Password
                  </button>
                  <button
                    className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
                    type="submit"
                  >
                    Save Shop Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </Spring>
  );
};

export default UserProfileDetails;
