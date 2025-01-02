import dayjs from "dayjs";
import { useState } from "react";
import { updateOrderStatus } from "@api/order";
import { Pagination } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css"; 

const OrdersTable = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleCancelOrderForShop = async (orderId) => {
    try {
      setIsCancelling(true);
      const success = await updateOrderStatus(orderId, "canceled");
      if (success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId
            ? { ...order, order_status: "canceled" }
            : order
        );
        setOrders(updatedOrders);
        toast.success("Trạng thái đơn hàng đã được cập nhật thành 'Đã hủy'.", {
          toastId: `cancel_${orderId}`,
        });
      } else {
        throw new Error("Failed to update order status to 'canceled'");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.", {
        toastId: `error_cancel_${orderId}`,
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const orderToUpdate = orders.find((order) => order._id === orderId);
      if (!orderToUpdate) return;

      let nextStatus;
      switch (orderToUpdate.order_status) {
        case "pending":
          nextStatus = "confirmed";
          break;
        case "confirmed":
          nextStatus = "shipped";
          break;
        case "shipped":
          nextStatus = "completed";
          break;
        default:
          return;
      }

      const success = await updateOrderStatus(orderId, nextStatus);
      if (success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, order_status: nextStatus } : order
        );
        setOrders(updatedOrders);
        toast.success(
          `Trạng thái đơn hàng đã được cập nhật thành '${nextStatus}'.`,
          { toastId: `update_${orderId}` }
        );
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.", {
        toastId: `error_update_${orderId}`,
      });
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = dayjs(order.createdAt);
    const isAfterStartDate = startDate
      ? orderDate.isAfter(dayjs(startDate).subtract(1, "day"))
      : true;
    const isBeforeEndDate = endDate
      ? orderDate.isBefore(dayjs(endDate).add(1, "day"))
      : true;
    return isAfterStartDate && isBeforeEndDate;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      {/* Date Filters */}
      <div className="mb-4 flex space-x-4">
        <div className="w-full">
          <label htmlFor="start-date" className="block text-lg font-medium">
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            id="start-date"
            className="mt-1 block w-full p-2 rounded-md shadow-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="end-date" className="block text-lg font-medium">
            Ngày kết thúc:
          </label>
          <input
            type="date"
            id="end-date"
            className="mt-1 block w-full p-2 rounded-md shadow-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      {paginatedOrders.length === 0 ? (
        <p className="text-gray-600 text-center h-60">
          Không có đơn hàng nào để hiển thị.
        </p>
      ) : (
        paginatedOrders.map((order) => (
          <div
            key={order._id}
            className="border-b py-4 px-6 min-h-60 bg-white rounded-lg shadow-md"
          >
            {/* Order Details */}
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Mã đơn hàng:{" "}
                  <span className="text-blue-600">
                    {order.order_trackingNumber}
                  </span>
                </h3>
                <p>Ngày tạo: {dayjs(order.createdAt).format("DD/MM/YYYY")}</p>
                <p>Trạng thái: {order.order_status}</p>
              </div>
              <div className="flex flex-col gap-5">
                {/* Hủy đơn hàng */}
                {order.order_status !== "cancel" &&
                  order.order_status !== "canceled" && (
                    <button
                      className={`text-white bg-rose-500 rounded-xl px-4 py-2 ${
                        order.order_status === "pending"
                          ? "hover:opacity-80"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleCancelOrderForShop(order._id)}
                      disabled={
                        order.order_status !== "pending" || isCancelling
                      }
                    >
                      Hủy đơn hàng
                    </button>
                  )}

                {/* Cập nhật trạng thái */}
                {order.order_status !== "completed" &&
                  order.order_status !== "cancel" &&
                  order.order_status !== "canceled" && (
                    <button
                      className="text-white bg-blue-500 rounded-xl px-4 py-2 hover:opacity-80"
                      onClick={() => handleUpdateStatus(order._id)}
                    >
                      Cập nhật trạng thái
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredOrders.length}
        onChange={handlePageChange}
        className="mt-4"
      />

      <ToastContainer />
    </div>
  );
};

export default OrdersTable;
