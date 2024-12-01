import dayjs from "dayjs";
import { useState } from "react";
import { updateOrderStatus } from "@api/order";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersTable = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrderForShop = async (orderId) => {
    try {
      setIsCancelling(true);
      const success = await updateOrderStatus(orderId, "cancelled");
      if (success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId
            ? { ...order, order_status: "cancelled" }
            : order
        );
        setOrders(updatedOrders); // Đặt lại danh sách đơn hàng
        toast.success("Trạng thái đơn hàng đã được cập nhật thành 'Đã hủy'.", {
          toastId: `cancel_${orderId}`,
        });
      } else {
        throw new Error("Failed to update order status to 'cancelled'");
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
          nextStatus = "processing";
          break;
        case "processing":
          nextStatus = "shipped";
          break;
        case "shipped":
          nextStatus = "completed";
          break;
        default:
          return; // Không có trạng thái tiếp theo
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

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      {/* Bộ lọc ngày */}
      <div className="mb-4 flex space-x-4">
        <div className="w-full">
          <label
            htmlFor="start-date"
            className="block text-lg font-medium text-gray-700"
          >
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            id="start-date"
            className="mt-1 block w-full border-2 border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="end-date"
            className="block text-lg font-medium text-gray-700"
          >
            Ngày kết thúc:
          </label>
          <input
            type="date"
            id="end-date"
            className="mt-1 block w-full border-2 border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Danh sách đơn hàng */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-600 text-center">
          Không có đơn hàng nào để hiển thị.
        </p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border-b py-4 px-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-800">
                  Mã đơn hàng:{" "}
                  <span className="text-blue-600">
                    {order.order_trackingNumber}
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  Ngày tạo: {dayjs(order.createdAt).format("DD/MM/YYYY")}
                </p>
                <p className="text-sm text-gray-600">
                  Trạng thái:{" "}
                  <span className="font-medium">{order.order_status}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Địa chỉ giao hàng: {order.order_shipping_address}
                </p>
                <p className="text-sm text-gray-600">
                  Phương thức thanh toán:{" "}
                  <span className="font-medium">
                    {order.order_payment_method.toUpperCase()}
                  </span>
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Tổng tiền:{" "}
                  <span className="text-red-600">
                    {order.order_total_price.toLocaleString()}₫
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {/* Hủy đơn hàng */}
                {order.order_status !== "cancel" &&
                  order.order_status !== "cancelled" && (
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
                  order.order_status !== "cancelled" && (
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

      <ToastContainer />
    </div>
  );
};

export default OrdersTable;
