import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, Checkbox, Form } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getAllAddresses,
  addNewAddress,
  updateAddress,
  deleteAddress,
} from "@api/profile";

const { Option } = Select;

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
      toast.error("Không thể tải địa chỉ. Vui lòng thử lại.");
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p");
      setLocationData((prev) => ({ ...prev, provinces: response.data }));
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
      toast.error("Không thể tải danh sách tỉnh/thành phố. Vui lòng thử lại.");
    }
  };

  const handleProvinceChange = async (provinceCode) => {
    const selectedProvince = locationData.provinces.find(
      (province) => province.code === Number(provinceCode)
    );
    setNewAddress((prev) => ({
      ...prev,
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
      toast.error("Không thể tải danh sách quận/huyện. Vui lòng thử lại.");
    }
  };

  const handleDistrictChange = async (districtCode) => {
    const selectedDistrict = locationData.districts.find(
      (district) => district.code === Number(districtCode)
    );
    setNewAddress((prev) => ({
      ...prev,
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
      toast.error("Không thể tải danh sách phường/xã. Vui lòng thử lại.");
    }
  };

  const handleWardChange = (wardCode) => {
    const selectedWard = locationData.wards.find(
      (ward) => ward.code === Number(wardCode)
    );
    setNewAddress((prev) => ({
      ...prev,
      ward: wardCode,
      wardName: selectedWard ? selectedWard.name : "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateAddress = async () => {
    if (
      !newAddress.recipient_name ||
      !newAddress.recipient_phone ||
      !newAddress.specific_address ||
      !newAddress.provinceName ||
      !newAddress.districtName ||
      !newAddress.wardName
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }

    const fullAddress = `${newAddress.specific_address}, ${newAddress.wardName}, ${newAddress.districtName}, ${newAddress.provinceName}`;
    const payload = { ...newAddress, address: fullAddress };

    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, payload);
        toast.success("Địa chỉ đã được cập nhật thành công!");
      } else {
        await addNewAddress(payload);
        toast.success("Địa chỉ mới đã được thêm thành công!");
      }
      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Không thể lưu địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({ ...address });
    setIsAddingNewAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Địa chỉ đã được xóa thành công!");
      fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Không thể xóa địa chỉ. Vui lòng thử lại.");
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
      <div className="flex justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4">Địa chỉ của tôi</h2>
        {!isAddingNewAddress && (
          <button
            onClick={() => setIsAddingNewAddress(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
          <div>
            <h3 className="text-lg font-semibold">{address.recipient_name}</h3>
            <p>{address.recipient_phone}</p>
            <p>{address.specific_address}, {address.address}</p>
          </div>
          <div>
            <button
              onClick={() => handleEditAddress(address)}
              className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={() => handleDeleteAddress(address._id)}
              className="bg-rose-500 text-white px-4 py-1 rounded"
            >
              Xóa
            </button>
          </div>
        </div>
      ))}
      <Modal
        title={editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
        visible={isAddingNewAddress}
        onCancel={resetForm}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleAddOrUpdateAddress}
          initialValues={newAddress}
        >
          <Form.Item label="Tên người nhận" required>
            <Input
              name="recipient_name"
              value={newAddress.recipient_name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại" required>
            <Input
              name="recipient_phone"
              value={newAddress.recipient_phone}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ cụ thể" required>
            <Input
              name="specific_address"
              value={newAddress.specific_address}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành phố" required>
            <Select
              value={newAddress.province}
              onChange={handleProvinceChange}
            >
              {locationData.provinces.map((province) => (
                <Option key={province.code} value={province.code}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quận/Huyện" required>
            <Select
              value={newAddress.district}
              onChange={handleDistrictChange}
              disabled={!newAddress.province}
            >
              {locationData.districts.map((district) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phường/Xã" required>
            <Select
              value={newAddress.ward}
              onChange={handleWardChange}
              disabled={!newAddress.district}
            >
              {locationData.wards.map((ward) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={newAddress.isDefault}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  isDefault: e.target.checked,
                }))
              }
            >
              Đặt làm địa chỉ mặc định
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={resetForm} className="mr-2">
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Address;
