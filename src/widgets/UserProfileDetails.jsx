// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import Select from "@ui/Select";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@contexts/themeContext";

// utils
import classNames from "classnames";
import countryList from "react-select-country-list";
import { City } from "country-state-city";

import { getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const UserProfileDetails = () => {
  let dataInforUser;
  if (getCookie("user_login")) {
    const token = JSON.parse(getCookie("user_login"));
    try {
      dataInforUser = jwtDecode(token);
      console.log(dataInforUser);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const { theme, toggleTheme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      Name: dataInforUser?.userName || "",
      email: dataInforUser?.email || "",
      phone: dataInforUser?.phoneNumber || "",
      country: null,
      address: "",
      shopName: "",
      pickupAddress: "",
      sellerEmail: "",
      sellerPhone: "",
    },
  });

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
    let options = [];
    const rawData = City.getCitiesOfCountry(country.value);
    rawData.forEach((item) =>
      options.push({ value: item.name, label: item.name })
    );
    setCities(options);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Profile updated successfully");
  };

  // Kiểm tra roleNames để hiển thị nội dung phù hợp
  const roleNames = ["user"]; // Giả sử roleNames được truyền vào hoặc được xác định từ dữ liệu người dùng

  return (
    <Spring
      className="card flex flex-col gap-[30px] md:gap-12 md:row-start-2 md:col-span-2 md:!pb-[50px]
                xl:row-start-1 xl:col-start-2 xl:col-span-1"
    >
      <div className="flex flex-col gap-5">
        <h5>My Profile Details</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-1 md:gap-5">
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="Name">
                  Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.Name,
                  })}
                  type="text"
                  id="Name"
                  placeholder="Name"
                  {...register("Name", { required: true })}
                />
                {errors.Name && (
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
                  placeholder="Email"
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
                      placeholder="Phone Number"
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
            </div>
          </div>

          <div className="flex justify-between mt-2.5">
            <button className="text-btn" type="button">
              Change password
            </button>
            <button
              className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
              type="submit"
            >
              Update information
            </button>
          </div>
        </form>
      </div>

      {roleNames.includes("user") && (
        <div className="mt-8">
          <h5>Seller Information</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-1 md:gap-5">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="shopName">
                  Shop Name
                </label>
                <input
                  className={`field-input ${
                    errors.shopName ? "field-input--error" : ""
                  }`}
                  type="text"
                  id="shopName"
                  placeholder="Enter your shop name"
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
                  className={`field-input ${
                    errors.pickupAddress ? "field-input--error" : ""
                  }`}
                  type="text"
                  id="pickupAddress"
                  placeholder="Enter your pickup address"
                  {...register("pickupAddress", { required: true })}
                />
                {errors.pickupAddress && (
                  <p className="error-message">Pickup address is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="sellerEmail">
                  Seller Email
                </label>
                <input
                  className={`field-input ${
                    errors.sellerEmail ? "field-input--error" : ""
                  }`}
                  type="text"
                  id="sellerEmail"
                  placeholder="Enter your email"
                  {...register("sellerEmail", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.sellerEmail && (
                  <p className="error-message">Valid email is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="sellerPhone">
                  Phone Number
                </label>
                <Controller
                  name="sellerPhone"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      value={field.value}
                      format="+#-###-###-####"
                      placeholder="Enter your phone number"
                      className={`field-input ${
                        errors.sellerPhone ? "field-input--error" : ""
                      }`}
                      getInputRef={field.ref}
                    />
                  )}
                />
                {errors.sellerPhone && (
                  <p className="error-message">Phone number is required</p>
                )}
              </div>

              <div className="field-wrapper">
                <label className="field-label" htmlFor="country">
                  Country
                </label>
                <Select
                  options={getCountriesOptions()}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                />
              </div>

              {cities.length > 0 && (
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="city">
                    City
                  </label>
                  <Select
                    options={cities}
                    value={selectedCity}
                    onChange={setSelectedCity}
                  />
                </div>
              )}

              <div className="flex justify-end mt-2.5">
                <button
                  className="btn btn--primary w-1/2 md:w-1/3 mt-5"
                  type="submit"
                >
                  Start Selling
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {roleNames.includes("admin") && (
        <div>
          <h5>Admin Panel Tools</h5>
          <div className="grid gap-4 mt-5 md:grid-cols-1 md:gap-5">
            {/* Admin-specific tools */}
          </div>
        </div>
      )}
    </Spring>
  );
};

export default UserProfileDetails;
