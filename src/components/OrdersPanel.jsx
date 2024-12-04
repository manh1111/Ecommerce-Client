import DrawerBase from "@ui/DrawerBase";
import { useState, useEffect } from "react";
import OrdersTable from "@widgets/OrdersTable";
import { getAllOrder } from "@api/order";
import Loader from "./Loader";
import { createReview } from "@api/review"; // Import the createReview function

const OrdersPanel = ({ open, onOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoader] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for review

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
    waiting: "Chờ thanh toán",
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

  const handleButtonClick = (order, action) => {
    if (action === "review") {
      setSelectedOrder(order);
      setIsModalOpen(true);
    } else if (action === "notReceived") {
      console.log("Order not received", order);
    }
  };

  const handleReviewSubmit = async (rating, comment) => {
    if (selectedOrder) {
      try {
        await createReview(selectedOrder.productId, rating, comment);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredOrders = orders;

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
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="flex space-x-4 min-w-max">
            {orderStatuses.map((status) => (
              <button
                key={status}
                className={`py-2 px-4 whitespace-nowrap rounded-md transition duration-200 ${
                  activeTab === status
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab(status)}
              >
                {statusTranslation[status] || "Tất cả"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="h-full overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <OrdersTable initialOrders={filteredOrders} />
            {activeTab === "completed" && filteredOrders.length > 0 && (
              <div className="mt-4 space-y-4">
                {/* Loop through completed orders */}
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="text-left flex-1">
                      <strong>{order.title}</strong>
                    </div>
                    <div className="flex space-x-4">
                      {/* "Đánh giá" button */}
                      {order.status === "completed" && (
                        <button
                          onClick={() => handleButtonClick(order, "review")}
                          className="py-2 px-6 bg-green-500 text-white rounded-md"
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Đánh giá sản phẩm</h2>
            <div className="mt-4">
              <label className="block">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                className="mt-2 p-2 border rounded-md"
                placeholder="Rate between 1 to 5"
                id="rating"
              />
            </div>
            <div className="mt-4">
              <label className="block">Comment</label>
              <textarea
                className="mt-2 p-2 border rounded-md"
                placeholder="Your comment"
                id="comment"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() =>
                  handleReviewSubmit(
                    document.getElementById("rating").value,
                    document.getElementById("comment").value
                  )
                }
                className="py-2 px-6 bg-blue-500 text-white rounded-md"
              >
                Submit Review
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-6 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DrawerBase>
  );
};

export default OrdersPanel;
