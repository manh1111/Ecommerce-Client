import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import DrawerBase from "@ui/DrawerBase";
import { getCookie } from "@utils/cookie";
import { getCart } from "@api/cart";
import { getProductById } from "@api/product";

const NotificationsPanel = ({ open, onOpen, onClose }) => {
  // Measure header and footer heights for dynamic sizing
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();

  // State management
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = JSON.parse(getCookie("user_login"));

  // Reset states and fetch cart data when the panel is opened
  useEffect(() => {
    if (open) {
      setFilter("all");
      setSelectedIds(new Set());
      fetchCartData();
    }
  }, [open]);

  // Fetch cart items and then get product details for each item
  const fetchCartData = async () => {
    setLoading(true);
    try {
      const cartItems = await getCart(); // Fetch cart items (product IDs and names)
      // Fetch product details for each item in the cart
      const detailedItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const productDetails = await getProductById(item.product_id);
            // Construct the notification object with required fields
            return {
              id: item.product_id,
              title: productDetails.product_name,
              category: productDetails.product_category || "Uncategorized",
              image: productDetails.product_img[0],
              price: productDetails.product_price.toLocaleString("vi-VN") + "₫",
              oldPrice: productDetails.product_old_price
                ? productDetails.product_old_price.toLocaleString("vi-VN") + "₫"
                : null,
              total:
                (
                  productDetails.product_price * (item.quantity || 1)
                ).toLocaleString("vi-VN") + "₫",
              label: "New",
              timestamp: Date.now(),
              stock: productDetails.product_quantity,
              quantity: item.quantity || 1,
            };
          } catch (err) {
            console.error("Error fetching product details:", err);
            return null; // Exclude the item if there's an error
          }
        })
      );
      // Filter out any null items (in case of errors)
      const validItems = detailedItems.filter((item) => item !== null);
      setNotifications(validItems);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Failed to load cart data");
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories for dynamic filters
  const categories = [
    "all",
    ...new Set(notifications.map((item) => item.category)),
  ];

  // Handle category filter change
  const handleFilterChange = (category) => {
    setFilter(category);
    setSelectedIds(new Set());
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const newSelectedIds = new Set(filteredData().map((item) => item.id));
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  // Handle individual checkbox change
  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Handle quantity changes
  const handleQuantityChange = (id, delta) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) + delta),
              total:
                (
                  parsePrice(item.price) *
                  Math.max(1, (item.quantity || 1) + delta)
                ).toLocaleString("vi-VN") + "₫",
            }
          : item
      )
    );
  };

  // Handle removing an item
  const handleRemoveItem = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  // Handle purchase action
  const handlePurchase = () => {
    if (selectedIds.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
      return;
    }
    alert(`Đã mua ${selectedIds.size} sản phẩm thành công!`);
    setNotifications((prev) =>
      prev.filter((item) => !selectedIds.has(item.id))
    );
    setSelectedIds(new Set());
  };

  // Utility to parse price string to number
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/₫|\.|,/g, "")) || 0;
  };

  // Filtered data based on current filter
  const filteredData = () => {
    return notifications.filter((notification) =>
      filter === "all" ? true : notification.category === filter
    );
  };

  // Check if all visible items are selected
  const isAllSelected =
    filteredData().length > 0 &&
    filteredData().every((item) => selectedIds.has(item.id));

  // Calculate total price of selected items
  const calculateTotalPrice = () => {
    return Array.from(selectedIds).reduce((total, id) => {
      const item = notifications.find((notification) => notification.id === id);
      return total + (item ? parsePrice(item.total) : 0);
    }, 0);
  };

  return (
    <DrawerBase
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      width="650px"
    >
      {/* Header */}
      <div className="pt-8 px-8 pb-4" ref={headerRef}>
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold">Giỏ Hàng</h5>
          <button
            className="text-red-500 text-2xl transition hover:text-red-700"
            onClick={onClose}
            aria-label="Close notifications panel"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {loading ? (
          <p className="text-center">Đang tải giỏ hàng...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Category Filters */}
            <div className="mb-4">
              <label className="mr-2 font-semibold">Lọc theo danh mục:</label>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`mr-2 mb-2 px-3 py-1 rounded ${
                    filter === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleFilterChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Cart Header */}
            <div className="flex items-center border-b pb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
              <span className="font-semibold w-1/3">Sản Phẩm</span>
              <span className="font-semibold w-1/6 text-center">Đơn Giá</span>
              <span className="font-semibold w-1/6 text-center">Số Lượng</span>
              <span className="font-semibold w-1/6 text-center">Số Tiền</span>
              <span className="font-semibold w-1/6 text-center">Thao Tác</span>
            </div>

            {/* Cart Items */}
            <div
              className="h-[60vh] overflow-y-auto mt-2"
              style={{
                height: `calc(100vh - ${headerHeight + footerHeight + 200}px)`,
              }}
            >
              {filteredData().length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                  Giỏ hàng trống.
                </p>
              ) : (
                filteredData()
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((notification) => (
                    <div
                      className="flex items-center py-4 border-b"
                      key={notification.id}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedIds.has(notification.id)}
                        onChange={() => handleSelectOne(notification.id)}
                      />
                      <img
                        src={notification.image}
                        alt={notification.title}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">
                          {notification.title.length > 15
                            ? `${notification.title.slice(0, 15)}...`
                            : notification.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Phân Loại Hàng:{" "}
                          <span className="font-semibold">
                            {notification.category}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mr-2">
                            {notification.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col text-end w-1/6 font-semibold">
                        {notification.oldPrice && (
                          <span className="line-through text-gray-500">
                            {notification.oldPrice}
                          </span>
                        )}
                        <span className="text-lg text-red-500">
                          {notification.price}
                        </span>
                      </div>
                      <div className="text-end w-1/6 font-semibold flex items-center">
                        <button
                          className="bg-gray-200 px-2 py-1 rounded"
                          onClick={() =>
                            handleQuantityChange(notification.id, -1)
                          }
                        >
                          -
                        </button>
                        <span className="mx-2">
                          {notification.quantity || 1}
                        </span>
                        <button
                          className="bg-gray-200 px-2 py-1 rounded"
                          onClick={() =>
                            handleQuantityChange(notification.id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="w-1/6 font-semibold text-red-500 text-center">
                        {notification.total}
                      </div>
                      <div className="text-end w-1/6">
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveItem(notification.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="pt-6 pb-4 px-6 border-t bg-white" ref={footerRef}>
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Tổng tiền:{" "}
            <span className="text-red-500">
              {calculateTotalPrice().toLocaleString("vi-VN")}₫
            </span>
          </span>
          <button
            className={`bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition ${
              selectedIds.size === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePurchase}
            disabled={selectedIds.size === 0}
          >
            Mua Hàng
          </button>
        </div>
      </div>
    </DrawerBase>
  );
};

export default NotificationsPanel;
