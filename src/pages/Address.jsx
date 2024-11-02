import { getAllAddresses, addNewAddress } from "@api/profile";
import axios from "axios";
import { useEffect, useState } from "react";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    id: "",
    userId: "", // Set this based on your user's context
    street: "",
    province: "", // Tỉnh
    district: "", // Quận
    ward: "", // Phường
    zipCode: "",
    country: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // Dữ liệu tỉnh, quận, phường
  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: {},
    wards: {},
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAllAddresses();
        setAddresses(response.data || []);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        alert("Không thể tải danh sách địa chỉ. Vui lòng thử lại.");
      }
    };

    // const fetchLocationData = async () => {
    //   try {
    //     const response = await fetch("https://provinces.open-api.vn/api/p");
    //     const provinces = await response.json();
    //     setLocationData((prev) => ({ ...prev, provinces }));
    //   } catch (error) {
    //     console.error("Failed to fetch location data:", error);
    //     alert("Không thể tải dữ liệu địa chỉ. Vui lòng thử lại.");
    //   }
    // };

    fetchAddresses();
    // fetchLocationData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p");
        const provinces = await response.json();
        console.log("first", provinces)
        setLocationData((prev) => ({ ...prev, provinces }));
      } catch (error) {
        console.error("Failed to fetch location data:", error);
        alert("Không thể tải dữ liệu địa chỉ. Vui lòng thử lại.");
      }

    setNewAddress((prevAddress) => ({
      ...prevAddress,
      province: provinceCode,
      district: "",
      ward: "",
    }));
  };

 const handleDistrictChange = async (e) => {
   const districtCode = e.target.value;
   setNewAddress((prevAddress) => ({
     ...prevAddress,
     district: districtCode,
     ward: "",
   }));

   // Early return if district code or province is not set
   if (!districtCode || !newAddress.province) return;

   try {
     const wards = await fetchWardsByDistrict(
       newAddress.province,
       districtCode
     );
     if (wards) {
       setLocationData((prevData) => ({
         ...prevData,
         wards: {
           ...prevData.wards,
           [districtCode]: wards,
         },
       }));
     } else {
       alert("Không có phường/xã nào cho quận/huyện đã chọn.");
     }
   } catch (error) {
     console.error("Failed to fetch wards:", error);
     alert("Không thể tải danh sách phường/xã. Vui lòng thử lại.");
   }
 };

 const fetchWardsByDistrict = async (provinceCode, districtCode) => {
   const response = await axios.get(
     `https://provinces.open-api.vn/api/d/${provinceCode}?depth=2`
   );
    console.log("response", response);
   if (!response.ok) {
     throw new Error("Network response was not ok");
   }
   const data = await response.json();

   console.log("data", data.districts);
   // Find the selected district
   const selectedDistrict = data.districts.find(
     (district) => district.code === districtCode
   );
   console.log("selectedDistrict", selectedDistrict);
   return selectedDistrict ? selectedDistrict.wards : null;
 };



  const handleAddAddress = async () => {
    try {
      const addedAddress = await addNewAddress(newAddress);
      setAddresses((prevAddresses) => [...prevAddresses, addedAddress]);
      setNewAddress({
        id: "",
        userId: "", // Set userId based on your application's context
        street: "",
        province: "",
        district: "",
        ward: "",
        zipCode: "",
        country: "",
      });
      setIsAddingNewAddress(false); // Close the form after adding
      alert("Địa chỉ mới đã được thêm thành công!");
    } catch (error) {
      console.error("Failed to add new address:", error);
      alert("Không thể thêm địa chỉ mới. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Địa chỉ của tôi</h2>
        <button
          onClick={() => setIsAddingNewAddress(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg flex items-center transition duration-200"
        >
          <span className="mr-2 text-lg">+</span> Thêm địa chỉ mới
        </button>
      </div>

      {/* New Address Form */}
      {isAddingNewAddress ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Thêm địa chỉ mới</h3>
          {/* Province Selection */}
          <select
            name="province"
            onChange={handleProvinceChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {locationData.provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>

          {/* District Selection */}
          <select
            name="district"
            onChange={handleDistrictChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn quận/huyện</option>
            {newAddress.province &&
              locationData.districts[newAddress.province] &&
              locationData.districts[newAddress.province].map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
          </select>

          {/* Ward Selection */}
          <select
            name="ward"
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn phường/xã</option>
            {newAddress.district &&
              locationData.wards[newAddress.district] &&
              locationData.wards[newAddress.district].map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="street"
            placeholder="Đường"
            value={newAddress.street}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            required
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg mt-4"
          >
            Thêm địa chỉ
          </button>
          <button
            onClick={() => setIsAddingNewAddress(false)}
            className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-lg mt-2 ml-2"
          >
            Hủy
          </button>
        </div>
      ) : (
        // Address List
        <div className="bg-white rounded-lg shadow-lg p-6">
          {addresses.length > 0 ? (
            addresses.map(
              (address) =>
                address && (
                  <div
                    key={address?.id}
                    className="border-b pb-4 mb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {address?.recipient_name}
                          {" -  "}
                          <span className="text-gray-500 font-normal text-sm">
                            {address?.recipient_phone}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          {address?.specific_address}, {address?.address}
                        </p>
                      </div>
                      <div>
                        <button className="text-blue-500">Cập nhật</button>
                        {!address?.isDefault && (
                          <button className="text-rose-500 ml-4">Xóa</button>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <p className="text-gray-500 text-center">Chưa có địa chỉ nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
