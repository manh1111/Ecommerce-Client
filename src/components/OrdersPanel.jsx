import DrawerBase from "@ui/DrawerBase";
import { useState, useEffect } from "react";
import OrdersTable from "@widgets/OrdersTable";
import { getAllOrder} from "@api/order"; 
import Loader from "./Loader";

const OrdersPanel = ({ open, onOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoader] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  const orderStatuses = [
    "",
    "pending",
    "confirmed",
    "shipped",
    "completed",
    "waiting",
    "cancelled",
  ];

 const statusTranslation = {
   pending: "Chờ xử lý",
   confirmed: "Đã xác nhận",
   shipped: "Đang vận chuyển",
   completed: "Hoàn thành",
   cancelled: "Đã hủy",
   waiting: "Chờ thanh toán"
 };

  useEffect(() => {
    const fetchOrders = async (status) => {
      setLoader(true);
      try {
        const data = await getAllOrder(status);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoader(false);
      }
    };

    if (open) {
      fetchOrders(activeTab);
    }
  }, [open, activeTab]);

  console.log("order", orders);
  const filteredOrders = orders

  const handleButtonClick = (order, action) => {
    if (action === "review") {
      console.log("Review order", order);
    } else if (action === "notReceived") {
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
              {statusTranslation[status] || "Tất cả"}{" "}
            </button>
          ))}
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        {loading ? (
          <Loader />
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
