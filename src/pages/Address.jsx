import {
  getAllAddresses,
  addNewAddress,
  updateAddress,
  deleteAddress,
} from "@api/profile";
import { useEffect, useState } from "react";
import axios from "axios";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    recipient_name: "",
    recipient_phone: "",
    specific_address: "",
    address: "",
    isDefault: false,
    province: "",
    district: "",
    ward: "",
    provinceName: "",
    districtName: "",
    wardName: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  useEffect(() => {
    fetchAddresses();
    fetchProvinces();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAllAddresses();
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      alert("Không thể tải địa chỉ. Vui lòng thử lại.");
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p");
      setLocationData((prev) => ({ ...prev, provinces: response.data }));
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
      alert("Không thể tải danh sách tỉnh/thành phố. Vui lòng thử lại.");
    }
  };

    const handleProvinceChange = async (e) => {
      const provinceCode = e.target.value;
      const selectedProvince = locationData.provinces.find(
        (province) => province.code === Number(provinceCode)
      );

      setNewAddress((prevAddress) => ({
        ...prevAddress,
        province: provinceCode,
        district: "",
        ward: "",
        provinceName: selectedProvince ? selectedProvince.name : "",
        districtName: "",
        wardName: "",
      }));

      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        );
        setLocationData((prev) => ({
          ...prev,
          districts: response.data.districts,
          wards: [],
        }));
      } catch (error) {
        console.error("Failed to fetch districts:", error);
        alert("Không thể tải danh sách quận/huyện. Vui lòng thử lại.");
      }
    };

    const handleDistrictChange = async (e) => {
      const districtCode = e.target.value;
      const selectedDistrict = locationData.districts.find(
        (district) => district.code === Number(districtCode)
      );

      setNewAddress((prevAddress) => ({
        ...prevAddress,
        district: districtCode,
        ward: "",
        districtName: selectedDistrict ? selectedDistrict.name : "",
        wardName: "",
      }));

      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        setLocationData((prev) => ({
          ...prev,
          wards: response.data.wards,
        }));
      } catch (error) {
        console.error("Failed to fetch wards:", error);
        alert("Không thể tải danh sách phường/xã. Vui lòng thử lại.");
      }
    };

    const handleWardChange = (e) => {
      const wardCode = e.target.value;
      const selectedWard = locationData.wards.find(
        (ward) => ward.code === Number(wardCode)
      );

      setNewAddress((prevAddress) => ({
        ...prevAddress,
        ward: wardCode,
        wardName: selectedWard ? selectedWard.name : "",
      }));
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleAddAddress = async () => {
      const fullAddress = `${newAddress.provinceName}, ${newAddress.districtName}, ${newAddress.wardName}`;

      const addressToAdd = {
        recipient_name: newAddress.recipient_name,
        recipient_phone: newAddress.recipient_phone,
        specific_address: newAddress.specific_address,
        address: fullAddress,
        isDefault: newAddress.isDefault,
      };

      try {
        const addedAddress = await addNewAddress(addressToAdd);
        setAddresses((prevAddresses) => [...prevAddresses, addedAddress]);
        resetForm();
        alert("Địa chỉ mới đã được thêm thành công!");
        await fetchAddresses();
      } catch (error) {
        console.error("Failed to add new address:", error);
        alert("Không thể thêm địa chỉ mới. Vui lòng thử lại.");
      }
    };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      ...address,
      provinceName: address.province,
      districtName: address.district,
      wardName: address.ward,
    });
    setIsAddingNewAddress(true);
  };

  const handleUpdateAddress = async () => {
    const fullAddress = `${newAddress.provinceName}, ${newAddress.districtName}, ${newAddress.wardName}`;

    try {
      await updateAddress(editingAddress._id, {
        ...newAddress,
        address: fullAddress,
      });
      resetForm();
      alert("Địa chỉ đã được cập nhật thành công!");
      await fetchAddresses(); // Fetch updated addresses after updating
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Không thể cập nhật địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      alert("Địa chỉ đã được xóa thành công!");
      await fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Không thể xóa địa chỉ. Vui lòng thử lại.");
    }
  };

  const resetForm = () => {
    setNewAddress({
      recipient_name: "",
      recipient_phone: "",
      specific_address: "",
      address: "",
      isDefault: false,
      province: "",
      district: "",
      ward: "",
      provinceName: "",
      districtName: "",
      wardName: "",
    });
    setIsAddingNewAddress(false);
    setEditingAddress(null);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex flex-row justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4">Địa chỉ của tôi</h2>
        {!isAddingNewAddress && (
          <button
            onClick={() => setIsAddingNewAddress(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Thêm địa chỉ mới
          </button>
        )}
      </div>
      {addresses.map((address) => (
        <div
          key={address._id}
          className="flex flex-row justify-between border-2 border-slate-200 bg-slate-50 mb-4 p-4 rounded-xl"
        >
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mr-5">
                {address.recipient_name}
              </h3>
              {address.isDefault && <div className="text-blue-500 border-blue-100 border-2 w-fit p-2 rounded-lg">Mặc định</div>}
            </div>
            <p>{address.recipient_phone}</p>
            <p>
              {address.specific_address}, {address.address}
            </p>
          </div>
          <div>
            <button
              onClick={() => handleEditAddress(address)}
              className="text-blue-500 px-4 py-1 rounded mr-2"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={() => handleDeleteAddress(address._id)}
              className="bg-red-500 text-rose-400 px-4 py-1 rounded"
            >
              Xóa
            </button>
          </div>
        </div>
      ))}

      {isAddingNewAddress && (
        <div className="border-2 border-slate-200 bg-slate-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            {editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
          </h3>
          <input
            type="text"
            name="recipient_name"
            placeholder="Tên người nhận"
            value={newAddress.recipient_name}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="tel"
            name="recipient_phone"
            placeholder="Số điện thoại"
            value={newAddress.recipient_phone}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="specific_address"
            placeholder="Địa chỉ cụ thể"
            value={newAddress.specific_address}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2 w-full"
            required
          />

          <select
            name="province"
            value={newAddress.province}
            onChange={handleProvinceChange}
            className="border rounded-md p-2 mb-2 w-full"
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
            value={newAddress.district}
            onChange={handleDistrictChange}
            className="border rounded-md p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn quận/huyện</option>
            {locationData.districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          <select
            name="ward"
            value={newAddress.ward}
            onChange={handleWardChange}
            className="border rounded-md p-2 mb-2 w-full"
            required
          >
            <option value="">Chọn phường/xã</option>
            {locationData.wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isDefault"
              checked={newAddress.isDefault}
              onChange={handleInputChange}
              className="mr-2"
            />
            Đặt làm địa chỉ mặc định
          </label>

          <button
            onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
