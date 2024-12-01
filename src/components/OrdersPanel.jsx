import DrawerBase from "@ui/DrawerBase";
import { useState, useEffect } from "react";
import OrdersTable from "@widgets/OrdersTable";
import { getAllOrder, deleteOrderById } from "@api/order"; // Import the deleteOrderById API function
import Loading from "./Loading";

const OrdersPanel = ({ open, onOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

 const orderStatuses = [
   "pending",
   "processing",
   "shipped",
   "delivered",
   "complete",
   "cancelled",
 ];

 const statusTranslation = {
   pending: "Chờ xử lý",
   processing: "Đang xử lý",
   shipped: "Đã gửi",
   delivered: "Đã giao",
   complete: "Hoàn thành",
   cancelled: "Đã hủy",
 };

  useEffect(() => {
    const fetchOrders = async (status) => {
      setLoading(true);
      try {
        const data = await getAllOrder(status);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchOrders(activeTab);
    }
  }, [open, activeTab]);

  const filteredOrders = orders.filter(
    (order) => order.order_status === activeTab
  );

  // Function to handle "Đánh giá" or "Chưa nhận hàng" button click for each order
  const handleButtonClick = (order, action) => {
    if (action === "review") {
      // Logic for review button click
      console.log("Review order", order);
    } else if (action === "notReceived") {
      // Logic for "Chưa nhận hàng" button click
      console.log("Order not received", order);
    }
  };

  return (
    <DrawerBase open={open} onOpen={onOpen} onClose={onClose} anchor="right">
      <div className="py-8 px-[30px] pb-4">
        <div className="flex justify-between items-center">
          <h5>Đơn hàng</h5>
          <button
            className="text-accent text-lg transition hover:text-red"
            onClick={onClose}
            aria-label="Close panel"
          >
            <i className="icon-circle-xmark-regular" />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling container for tabs */}
      <div className="pb-4">
        <div className="flex overflow-x-auto space-x-4 min-w-max">
          {" "}
          {/* Ensure buttons have enough width */}
          {orderStatuses.map((status) => (
            <button
              key={status}
              className={`py-2 px-4 rounded-md transition duration-200 ${
                activeTab === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(status)} 
            >
              {statusTranslation[status]}{" "}
            </button>
          ))}
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <OrdersTable initialOrders={filteredOrders} />
            {activeTab === "delivered" && filteredOrders.length > 0 && (
              <div className="mt-4 space-y-4">
                {/* Loop through delivered orders and show buttons */}
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="text-left flex-1">
                      <strong>{order.title}</strong>
                      {/* Add other order details here */}
                    </div>

                    <div className="flex space-x-4">
                      {/* Button for "Đánh giá" */}
                      <button
                        onClick={() => handleButtonClick(order, "review")}
                        className="py-2 px-6 bg-green-500 text-white rounded-md"
                      >
                        Đánh giá
                      </button>

                      {/* Button for "Chưa nhận hàng" */}
                      <button
                        onClick={() => handleButtonClick(order, "notReceived")}
                        className="py-2 px-6 bg-orange-500 text-white rounded-md"
                      >
                        Chưa nhận hàng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DrawerBase>
  );
};

export default OrdersPanel;
