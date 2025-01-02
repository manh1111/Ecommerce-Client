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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form";
import { AddressFormModal } from "@components/AddressFormModal";

const { Option } = Select;

const addressSchema = z.object({
  recipient_name: z.string().min(1),
  recipient_phone: z.string().min(10),
  specific_address: z.string({ required_error: 'Nhập địa chỉ' }).nonempty(),
  isDefault: z.boolean().optional(),
  province: z.number({ required_error: 'Chọn thành phố' }),
  district: z.number({ required_error: 'Chọn quận/huyện' }),
  ward: z.number({ required_error: 'Chọn phường/xã' }),
})

const defaultValues = {
  recipient_name: "",
  recipient_phone: "",
  specific_address: "",
  isDefault: false,
  province: "",
  district: "",
  ward: ""
}

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false)
  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });


  useEffect(() => {
    setLoading(true)
    fetchAddresses();
    fetchProvinces().then(() => {
      setLoading(false)
    });
  }, []);



  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
    mode: "onSubmit"
  })


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

  // const handleWardChange = (wardCode) => {
  //   const selectedWard = locationData.wards.find(
  //     (ward) => ward.code === Number(wardCode)
  //   );
  //   setNewAddress((prev) => ({
  //     ...prev,
  //     ward: wardCode,
  //     wardName: selectedWard ? selectedWard.name : "",
  //   }));
  // };

  const handleAddOrUpdateAddress = async (data) => {
    const selectedWard = locationData.wards.find(
      (ward) => ward.code === data.ward
    );
    const selectedDistrict = locationData.districts.find(
      (district) => district.code === data.district
    );
    const selectedProvince = locationData.provinces.find(
      (province) => province.code === data.province
    );


    const fullAddress = `${data.specific_address}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
    const payload = {
      ...data,
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address: fullAddress
    };

    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, payload);
        toast.success("Địa chỉ đã được cập nhật thành công!");
      } else {
        await addNewAddress(payload);
        toast.success("Địa chỉ mới đã được thêm thành công!");
      }
      reset(defaultValues)
      setIsAddingNewAddress(false)
      fetchAddresses();
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Không thể lưu địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
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



  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4">Địa chỉ của tôi</h2>
        {!isAddingNewAddress && (
          <button
            onClick={() => {
              setIsAddingNewAddress(true)
              reset(defaultValues)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Thêm địa chỉ mới
          </button>
        )}
      </div>
      {addresses && !loading && addresses.map((address) => (
        <div
          key={address._id}
          className="card flex flex-row justify-between border-2 border-slate-200 bg-slate-50 mb-4 p-4 rounded-xl"
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
      
      <AddressFormModal
        control={control}
        editingAddress={editingAddress}
        isAddingNewAddress={isAddingNewAddress}
        setIsAddingNewAddress={setIsAddingNewAddress}
        setEditingAddress={setEditingAddress}
        reset={reset}
        errors={errors}
        handleAddOrUpdateAddress={handleAddOrUpdateAddress}
        locationData={locationData}
        setLocationData={setLocationData}
        handleDistrictChange={handleDistrictChange}
        handleProvinceChange={handleProvinceChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Address;
