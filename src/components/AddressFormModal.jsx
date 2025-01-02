import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, Checkbox, Form } from "antd";
import axios from "axios";
import { Controller } from "react-hook-form";

const { Option } = Select;

export const AddressFormModal = ({
  control,
  editingAddress,
  setIsAddingNewAddress,
  setEditingAddress,
  reset,
  errors,
  handleAddOrUpdateAddress,
  locationData,
  handleDistrictChange,
  handleProvinceChange,
  handleSubmit,
  isAddingNewAddress,
  setLocationData
}) => {

  useEffect(() => {
    if (editingAddress) {
      setFormData()
    }
  }, [editingAddress])

  const setFormData = async () => {
    const province = locationData.provinces.find(p => p.name === editingAddress.address?.province)
    // if (!province) return;
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
    );
    const district = data.districts.find(d => d.name === editingAddress.address?.district)
    // if (!district) return;
    const { data: wardsData } = await axios.get(
      `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
    );
    const ward = wardsData.wards.find(w => w.name === editingAddress.address?.ward)

    setLocationData((prev) => ({
      ...prev,
      districts: data.districts,
      wards: wardsData.wards,
    }));
    reset({
      ...editingAddress,
      province: province.code,
      district: district.code,
      ward: ward.code
    })
  }

  return (
    <div>
      <Modal
        title={editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
        open={isAddingNewAddress}
        onCancel={() => {
          setIsAddingNewAddress(false)
          setEditingAddress(null)
          reset()
        }}
        footer={null}
      >
        <Form
          layout="vertical"
        >
          <Form.Item label="Tên người nhận">
            <Controller
              name='recipient_name'
              control={control}
              render={({ field, fieldState }) => (
                <Input {...field} />
              )}
            />
            {errors.recipient_name && <p className="text-rose-500 mt-2">Nhập tên người nhận</p>}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Controller
              name='recipient_phone'
              control={control}
              render={({ field }) => (
                <Input {...field} />
              )}
            />
            {errors.recipient_phone && <p className="text-rose-500 mt-2">Nhập số điện thoại người nhận</p>}
          </Form.Item>
          <Form.Item label="Địa chỉ cụ thể">
            <Controller
              name='specific_address'
              control={control}
              render={({ field, fieldState }) => (
                <Input {...field} />
              )}
            />
            {errors.specific_address && <p className="text-rose-500 mt-2">Nhập địa chỉ người nhận</p>}
          </Form.Item>
          <Form.Item label="Tỉnh/Thành phố">
            <Controller
              name='province'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={(e) => {
                    onChange(e)
                    handleProvinceChange(e)
                  }}>
                  {locationData.provinces.map((province) => (
                    <Option key={province.code} value={province.code}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.province && <p className="text-rose-500 mt-2">Chọn thành phố</p>}
            {/* <Select
            value={newAddress.province}
            onChange={handleProvinceChange}
          >
            {locationData.provinces.map((province) => (
              <Option key={province.code} value={province.code}>
                {province.name}
              </Option>
            ))}
          </Select> */}
          </Form.Item>
          <Form.Item label="Quận/Huyện">
            <Controller
              name='district'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={(e) => {
                    onChange(e)
                    handleDistrictChange(e)
                  }}
                >
                  {locationData.districts.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.district && <p className="text-rose-500 mt-2">Chọn quận/huyện</p>}
            {/* <Select
            value={newAddress.district}
            onChange={handleDistrictChange}
            disabled={!newAddress.province}
          >
            {locationData.districts.map((district) => (
              <Option key={district.code} value={district.code}>
                {district.name}
              </Option>
            ))}
          </Select> */}
          </Form.Item>
          <Form.Item label="Phường/Xã">
            <Controller
              name='ward'
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {locationData.wards.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.ward && <p className="text-rose-500 mt-2">Chọn phường/xã</p>}
            {/* <Select
            value={newAddress.ward}
            onChange={handleWardChange}
            disabled={!newAddress.district}
          >
            {locationData.wards.map((ward) => (
              <Option key={ward.code} value={ward.code}>
                {ward.name}
              </Option>
            ))}
          </Select> */}
          </Form.Item>
          <Form.Item>
            <Controller
              name='isDefault'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  checked={value}
                  onChange={(e) =>
                    onChange(e.target.checked)
                  }
                >
                  Đặt làm địa chỉ mặc định
                </Checkbox>
              )}
            />
            {/* <Checkbox
            checked={newAddress.isDefault}
            onChange={(e) =>
              setNewAddress((prev) => ({
                ...prev,
                isDefault: e.target.checked,
              }))
            }
          >
            Đặt làm địa chỉ mặc định
          </Checkbox> */}
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={() => {
                setEditingAddress(null)
                setIsAddingNewAddress(false)
                reset()
              }} className="mr-2">
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(handleAddOrUpdateAddress)}
              >
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}