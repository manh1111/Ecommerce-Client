import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createCatalogs,
  deleteCatalog,
  getCatalogs,
  updateCatalog,
} from "@api/catalog ";
import StyledTable from "@widgets/ProductManagementTable/styles";
import PageHeader from "@layout/PageHeader";

const Catalog = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("create");
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const data = await getCatalogs();
      const transformedData = data.map((item) => ({
        id: item._id,
        catalogName: item.catalog_name,
        catalogDescription: item.catalog_description,
        shopId: item.shop_id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      setCatalogs(transformedData);
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = (type, record = null) => {
    setAction(type);
    setSelectedCatalog(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        catalogName: record.catalogName,
        catalogDescription: record.catalogDescription,
      });
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCatalog(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (action === "create") {
        await createCatalogs(values.catalogName, values.catalogDescription);
        toast.success("Tạo danh mục thành công");
      } else if (action === "edit" && selectedCatalog) {
        await updateCatalog(selectedCatalog.id, {
          catalogName: values.catalogName,
          catalogDescription: values.catalogDescription,
        });
        toast.success("Cập nhật danh mục thành công");
      }
      fetchCatalogs();
      handleModalClose();
    } catch (error) {
      toast.error(
        `Không thể ${action === "create" ? "tạo" : "cập nhật"} danh mục`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCatalog(id);
      toast.success("Xóa danh mục thành công");
      fetchCatalogs();
    } catch (error) {
      toast.error("Không thể xóa danh mục");
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "catalogName",
      key: "catalogName",
    },
    {
      title: "Mô tả",
      dataIndex: "catalogDescription",
      key: "catalogDescription",
    },
    {
      title: "Mã cửa hàng",
      dataIndex: "shopId",
      key: "shopId",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-row items-center justify-between">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleModalOpen("edit", record)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <ToastContainer />
      <PageHeader title="Quản lý danh mục" />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleModalOpen("create")}
        className="mb-4 bg-green-500 text-white hover:bg-green-600"
      >
        Thêm danh mục
      </Button>
      <StyledTable
        dataSource={catalogs}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          position: ["bottomCenter"],
          style: { textAlign: "center" },
        }}
        className="bg-white rounded-lg shadow-md"
      />

      <Modal
        title={`${action === "create" ? "Thêm" : "Sửa"} danh mục`}
        open={showModal}
        onOk={handleSave}
        onCancel={handleModalClose}
        okText={action === "create" ? "Tạo mới" : "Lưu"}
        className="rounded-lg"
        style={{
          top: "30%",
          left: "30%",
          maxWidth: "600px", // Optional: to limit the modal width
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="catalogName"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item name="catalogDescription" label="Mô tả">
            <Input.TextArea placeholder="Nhập mô tả (không bắt buộc)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Catalog;
