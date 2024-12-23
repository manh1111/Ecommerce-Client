import { useEffect, useState } from "react";
import { Table, Alert } from "antd";
import Loader from "@components/Loader";
import { getCustomer } from "@api/customer";
import PageHeader from "@layout/PageHeader";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomer();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
        setError("Không thể tải danh sách khách hàng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Cấu hình các cột trong bảng
  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="Avatar"
          className="rounded-full w-20 h-20 object-cover"
        />
      ), // Cập nhật ảnh đại diện và tăng kích thước
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={status === "active" ? "text-green-500" : "text-red-500"}
        >
          {status === "active" ? "Đang hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];

  // Render bảng
  return (
    <>
      <PageHeader title="Khách hàng" />
      <div className="container mx-auto my-6 bg-white rounded-lg ">
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <Table
            columns={columns}
            dataSource={customers}
            rowKey="_id"
            pagination={false}
            className="rounded-lg shadow-lg ant-customers"
          />
        )}
      </div>
    </>
  );
};

export default Customers;
