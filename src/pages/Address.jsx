import { getAllAddresses, addNewAddress } from "@api/profile";
import { useEffect, useState } from "react";
import axios from "axios";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    id: "",
    userId: "", // Đặt userId dựa trên ngữ cảnh của ứng dụng
    street: "",
    province: "",
    district: "",
    ward: "",
    zipCode: "",
    country: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: {},
    wards: {},
  });

  console.log('locationData', locationData);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAllAddresses();
        setAddresses(response.data || []);
      } catch (error) {
        console.error("Không thể tải danh sách địa chỉ:", error);
        alert("Không thể tải danh sách địa chỉ. Vui lòng thử lại.");
      }
    };

    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p");
        setLocationData((prev) => ({ ...prev, provinces: response.data }));
      } catch (error) {
        console.error("Không thể tải dữ liệu tỉnh:", error);
        alert("Không thể tải dữ liệu tỉnh. Vui lòng thử lại.");
      }
    };

    fetchAddresses();
    fetchProvinces();
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
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      province: provinceCode,
      district: "",
      ward: "",
    }));

    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      setLocationData((prev) => ({
        ...prev,
        districts: { [provinceCode]: response.data.districts },
      }));
    } catch (error) {
      console.error("Không thể tải dữ liệu quận/huyện:", error);
      alert("Không thể tải dữ liệu quận/huyện. Vui lòng thử lại.");
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      district: districtCode,
      ward: "",
    }));

    if (!newAddress.province) return;

    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      setLocationData((prev) => ({
        ...prev,
        wards: { [districtCode]: response.data.wards },
      }));
    } catch (error) {
      console.error("Không thể tải dữ liệu phường/xã:", error);
      alert("Không thể tải dữ liệu phường/xã. Vui lòng thử lại.");
    }
  };

  const handleAddAddress = async () => {
    try {
      const addedAddress = await addNewAddress(newAddress);
      setAddresses((prevAddresses) => [...prevAddresses, addedAddress]);
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
      setIsAddingNewAddress(false);
      alert("Địa chỉ mới đã được thêm thành công!");
    } catch (error) {
      console.error("Không thể thêm địa chỉ mới:", error);
      alert("Không thể thêm địa chỉ mới. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Địa chỉ của tôi</h2>
        <button
          onClick={() => setIsAddingNewAddress(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg flex items-center transition duration-200"
        >
          <span className="mr-2 text-lg">+</span> Thêm địa chỉ mới
        </button>
      </div>

      {isAddingNewAddress ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Thêm địa chỉ mới</h3>
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

          <select
            name="district"
            onChange={handleDistrictChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn quận/huyện</option>
            {newAddress.province &&
              locationData.districts[newAddress.province]?.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
          </select>

          <select
            name="ward"
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn phường/xã</option>
            {newAddress.district &&
              locationData.wards[newAddress.district]?.map((ward) => (
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          {addresses.length > 0 ? (
            addresses.map(
              (address) =>
                address && (
                  <div key={address?.id} className="border-b pb-4 mb-4 last:border-b-0">
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
