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
    "cancelled",
    "paid",
  ];

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
        <div className="flex overflow-x-auto space-x-4 min-w-max pl-4">
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
              onClick={() => setActiveTab(status)} // Logic remains unchanged
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
              {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        {loading ? (
          <Loading />
        ) : (
          <OrdersTable
            initialOrders={filteredOrders}
            // onCancelOrder={handleCancelOrder}
          />
        )}
      </div>
    </DrawerBase>
  );
};

export default OrdersPanel;
