import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { deleteOrderById } from "@api/order";
import { toast } from "react-toastify";
import { createReview } from "@api/review"; // Import createReview API

const OrdersTable = ({ initialOrders = [] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reviewData, setReviewData] = useState({});
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  // Handle click outside to close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsReviewModalOpen(false);
      }
    };

    if (isReviewModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isReviewModalOpen]);

  const comment = [
    "Sản phẩm rất tốt",
    "Chất lượng tuyệt vời", 
    "Giao hàng nhanh chóng",
    "Đóng gói cẩn thận", 
    "Hài lòng với sản phẩm"]
  const handleCancelOrder = async (orderId) => {
    const updatedOrders = orders.filter((order) => order._id !== orderId);
    setOrders(updatedOrders);

    try {
      const res = await deleteOrderById(orderId);
      if (res.status === 200) {
        toast.success("Đơn hàng đã được hủy thành công.", {
          toastId: orderId,
        });
      } else {
        throw new Error("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Sản phẩm không tồn tại.", {
        toastId: "error_" + orderId,
      });
      setOrders(initialOrders);
    }
  };

  // Handle review input changes
  const handleReviewChange = (field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [selectedOrder._id]: {
        ...(prev[selectedOrder._id] || {}),
        [selectedProduct._id]: {
          ...prev[selectedOrder._id]?.[selectedProduct._id],
          [field]: value,
        },
      },
    }));
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    const { rating, comment } =
      reviewData[selectedOrder._id]?.[selectedProduct._id] || {};

    console.log("selectedProduct._id", selectedProduct);
    try {
      await createReview(selectedProduct.productId, rating, comment);
      toast.success("Đánh giá đã được gửi thành công!");
      setIsReviewModalOpen(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Sản phẩm không còn tồn tại.");
      } else {
        toast.error("Có lỗi xảy ra khi gửi đánh giá.");
      }
      setIsReviewModalOpen(false);
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
  const handleButtonClick = (order, action) => {
   if (action === "pay") {
      console.log("Proceeding with payment for order", order);
    } else if (action === "cancel") {
      console.log("Canceling order", order);
    } else if (action === "changePaymentMethod") {
      console.log("Changing payment method for order", order);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      {/* Date range filter */}
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

      {/* Display orders */}
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
            {console.log("order.order_shipping_address", order)}
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
              <div className="flex flex-col w-[250px] items-center justify-end">
                {order.order_status === 'pending' &&
                  <button
                    className={`text-white w-10/12 bg-rose-500 rounded-xl px-4 py-2 ${order.order_status === "pending"
                        ? "hover:opacity-80"
                        : "opacity-50 cursor-not-allowed"
                      }`}
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={order.order_status !== "pending"}
                  >
                    Hủy đơn hàng
                  </button>
                }
                {console.log("order.order_status", order.order_status)}

                 {/* Handle 'waiting' status */}
                {order.order_status === "waiting" && (
                    <div className="flex flex-col gap-4">
                    <button
                      onClick={() => handleButtonClick(order, "pay")}
                      className="w-40 py-2 px-4 bg-blue-500 text-white rounded-md"
                    >
                      Thanh toán lại
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="w-40 py-2 px-4 bg-rose-500 text-white rounded-md"
                    >
                      Hủy đơn
                    </button>
                    <button
                      onClick={() => handleButtonClick(order, "changePaymentMethod")}
                      className="w-40 py-2 px-4 bg-emerald-500 text-white rounded-md"
                    >
                      Đổi phương thức
                    </button>
                  </div>
                  
                )}

                {order.order_status === "completed" &&
                  order.order_products.map((product) => (
                    <button
                      key={product._id}
                      className="mt-2 w-10/12 text-white bg-blue-500 rounded-xl px-4 py-2"
                      onClick={() => {
                        setSelectedOrder(order);
                        setSelectedProduct(product); // Set selected product here
                        setIsReviewModalOpen(true);
                      }}
                    >
                      Đánh giá
                    </button>
                  ))}
              </div>
            </div>

            {/* Display products in order */}
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

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-[48rem]" 
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Đánh giá sản phẩm
            </h3>

            {/* Star Rating */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`cursor-pointer text-2xl ${
                      rating <= (reviewData[selectedOrder._id]?.[selectedProduct._id]?.rating || 0)
                        ? "text-amber-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleReviewChange("rating", rating)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-4">
              {/* Suggestion Buttons */}
              <div className="flex flex-wrap my-4 gap-2">
                {["Sản phẩm rất tốt", "Chất lượng tuyệt vời", "Giao hàng nhanh chóng", "Đóng gói cẩn thận", "Hài lòng với sản phẩm"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleReviewChange(
                        "comment",
                        (reviewData[selectedOrder._id]?.[selectedProduct._id]?.comment || "") + " " + suggestion
                      )
                    }
                    className="border-2 border-gray-400 bg-gray-200 px-3 py-2 rounded-full text-sm hover:bg-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <label className="block">Nhận xét</label>
              <textarea
                rows={4}
                value={
                  reviewData[selectedOrder._id]?.[selectedProduct._id]?.comment || ""
                }
                onChange={(e) => handleReviewChange("comment", e.target.value)}
                className="mt-2 w-full border-2 border-gray-300 p-2 rounded-md"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-white bg-gray-500 px-4 py-2 rounded-md"
              >
                Đóng
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={
                  !(reviewData[selectedOrder._id]?.[selectedProduct._id]?.rating &&
                    reviewData[selectedOrder._id]?.[selectedProduct._id]?.comment)
                }
                className={`px-4 py-2 rounded-md ${
                  reviewData[selectedOrder._id]?.[selectedProduct._id]?.rating &&
                  reviewData[selectedOrder._id]?.[selectedProduct._id]?.comment
                    ? "text-white bg-blue-600"
                    : "text-white bg-blue-300 cursor-not-allowed"
                }`}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
