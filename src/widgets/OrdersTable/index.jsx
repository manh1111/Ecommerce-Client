import dayjs from "dayjs";
import { useState } from "react";
import { deleteOrderById } from "@api/order";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersTable = ({ initialOrders = [] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await deleteOrderById(orderId);

      if (res && res.status === 200) {
        toast.success("Đơn hàng đã được hủy thành công.");

        // Remove the canceled order from the list
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.filter(
            (order) => order._id !== orderId
          );
          console.log("Updated Orders After Deletion:", updatedOrders); // Log to check updated orders
          return updatedOrders;
        });
      } else {
        throw new Error("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Có lỗi xảy ra khi hủy đơn hàng.");
    }
  };

  // Filter orders based on selected date range
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
      <ToastContainer />

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

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600 text-center text-red">
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
              <div>
                <button
                  className={`text-white bg-rose-500 rounded-xl px-4 py-2 ${
                    order.order_status === "pending"
                      ? "hover:opacity-80"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={order.order_status !== "pending"}
                >
                  Hủy đơn hàng
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.order_products.map((product) => (
                <div key={product._id} className="flex items-center">
                  <img
                    src={product.product_thumb}
                    alt={product.product_name}
                    className="w-14 h-14 object-cover rounded-md shadow"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {product.product_name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Số lượng:{" "}
                      <span className="font-medium">{product.quantity}</span> x{" "}
                      <span className="font-medium">
                        {product.price.toLocaleString()}₫
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTable;
