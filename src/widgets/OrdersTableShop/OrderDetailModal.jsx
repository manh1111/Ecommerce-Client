import React from "react";
import dayjs from "dayjs";

const OrderDetailModal = ({ order, onClose }) => {
  console.log("orderrr", order)
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-container w-11/12 sm:w-4/5 md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-header flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold">Chi tiết đơn hàng</h2>
          <button
            className="text-xl text-gray-600 hover:text-red-600"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body mt-4 space-y-4">
          <p><strong>Mã đơn hàng:</strong> {order.order_trackingNumber}</p>
          <p><strong>Ngày tạo:</strong> {dayjs(order.createdAt).format("DD/MM/YYYY")}</p>
          <p><strong>Trạng thái:</strong> {order.order_status}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {order.order_shipping_address}</p>

          <h3 className="mt-4 font-medium text-lg">Sản phẩm:</h3>
          <ul className="space-y-3">
            {order.order_products.map((product) => (
              <li key={product._id} className="flex items-center space-x-4 border-b pb-3">
                <img
                  src={product.product_thumb}
                  alt={product.product_name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{product.product_name}</p>
                  <p>Số lượng: {product.quantity}</p>
                  <p>Giá: {product.price.toLocaleString()}₫</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-footer mt-6">
        <div className="modal-footer mt-6 flex justify-between w-full">
          <p><strong>Tổng tiền:</strong> {order.order_total_price.toLocaleString()}₫</p>
    
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
