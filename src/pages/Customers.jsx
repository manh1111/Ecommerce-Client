import { useEffect, useState } from "react";
import { Table, Alert } from "antd";
import Loader from "@components/Loader";
import { getCustomer } from "@api/customer";
import PageHeader from "@layout/PageHeader";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số bản ghi mỗi trang

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomer(); // Giả sử API trả về tất cả khách hàng
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
      ),
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

  // Xử lý sự kiện phân trang
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

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
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: customers.length, // Tổng số bản ghi
              showSizeChanger: true, // Hiển thị tùy chọn thay đổi số bản ghi
              pageSizeOptions: ["5", "10", "20", "50"], // Các lựa chọn số bản ghi
            }}
            onChange={handleTableChange}
            className="rounded-lg shadow-lg ant-customers"
          />
        )}
      </div>
    </>
  );
};

export default Customers;
