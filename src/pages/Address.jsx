import { getAllAddresses, addNewAddress } from "@api/profile";
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

  // Dữ liệu tỉnh, quận, phường (có thể được tải từ API hoặc một file tĩnh)
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

    const fetchLocationData = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p");
        const provinces = await response.json();
        const districts = {};
        const wards = {};

        for (const province of provinces) {
          const districtResponse = await fetch(
            `https://provinces.open-api.vn/api/d/${province.code}`
          );
          const districtData = await districtResponse.json();
          districts[province.code] = districtData.districts;

          for (const district of districtData.districts) {
            const wardResponse = await fetch(
              `https://provinces.open-api.vn/api/ward/${district.code}`
            );
            const wardData = await wardResponse.json();
            wards[district.code] = wardData.wards;
          }
        }

        setLocationData({ provinces, districts, wards });
      } catch (error) {
        console.error("Failed to fetch location data:", error);
        alert("Không thể tải dữ liệu địa chỉ. Vui lòng thử lại.");
      }
    };

    fetchAddresses();
    fetchLocationData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      province: provinceCode,
      district: "",
      ward: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      district: districtCode,
      ward: "",
    }));
  };

  const handleAddAddress = async () => {
    try {
      const addedAddress = await addNewAddress(newAddress);
      setAddresses((prevAddresses) => [...prevAddresses, addedAddress]);
      // Reset the newAddress state after adding
      setNewAddress({
        id: "",
        userId: "",
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
          <input
            type="text"
            name="street"
            placeholder="Đường"
            value={newAddress.street}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            required
          />

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
            name="zipCode"
            placeholder="Mã bưu điện"
            value={newAddress.zipCode}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Quốc gia"
            value={newAddress.country}
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
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border-b pb-4 mb-4 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {address.name}{" "}
                    <span className="text-gray-500">{address.phone}</span>
                  </p>
                  <p className="text-gray-700">{address.street}</p>
                  <p className="text-gray-700">
                    {address.province}, {address.district}, {address.ward}
                  </p>
                </div>
                <div>
                  <button className="text-blue-500 hover:underline">
                    Cập nhật
                  </button>
                  <button className="text-blue-500 hover:underline ml-4">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
