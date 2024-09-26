// components/NotificationsPanel.jsx

// Import necessary modules and components
import React, { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import DrawerBase from "@ui/DrawerBase";

// Sample notifications data
const notificationsData = [
  {
    id: 1,
    image: "https://placehold.co/60x60",
    title: "Chân váy nàng thơ JOLIE 8 mảnh, chân váy xòe dáng dài chữ...",
    category: "Đồ thời trang",
    label: "Yêu thích",
    oldPrice: "₫385.000",
    price: "₫249.000",
    total: "₫249.000",
    timestamp: 1632981600,
    stock: 1,
  },
  {
    id: 2,
    image: "https://placehold.co/60x60",
    title: "Máy lọc không khí Sharp PureAir 2024",
    category: "Điện tử",
    label: "Khuyến mãi",
    oldPrice: "₫2.000.000",
    price: "₫1.800.000",
    total: "₫1.800.000",
    timestamp: 1632981200,
    stock: 1,
  },
  {
    id: 3,
    image: "https://placehold.co/60x60",
    title: "Bộ đồ gia đình Villeroy & Boch",
    category: "Gia dụng",
    label: "Mới",
    oldPrice: "₫500.000",
    price: "₫450.000",
    total: "₫450.000",
    timestamp: 1632981800,
    stock: 1,
  },
  // Add more products as needed
];

const NotificationsPanel = ({ open, onOpen, onClose }) => {
  // Measure header and footer heights for dynamic sizing
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();

  // State management
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Extract unique categories for dynamic filters
  const categories = [
    "all",
    ...new Set(notificationsData.map((item) => item.category)),
  ];

  // Reset states when the panel is opened
  useEffect(() => {
    if (open) {
      setFilter("all");
      setSelectedIds(new Set());
    }
  }, [open]);

  // Handle category filter change
  const handleFilterChange = (category) => {
    setFilter(category);
    setSelectedIds(new Set()); // Reset selections on filter change
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
                parsePrice(item.price) *
                Math.max(1, (item.quantity || 1) + delta),
              stock: Math.max(1, (item.quantity || 1) + delta),
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
            height: `calc(100vh - ${headerHeight + footerHeight + 200}px)`, // Adjusted for header and footer
          }}
        >
          {filteredData().length === 0 ? (
            <p className="text-center text-gray-500 mt-4">Giỏ hàng trống.</p>
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
                  <div className="text-end w-1/6 font-semibold">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(notification.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{notification.stock}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(notification.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-end w-1/6 font-semibold">
                    {notification.total}
                  </div>
                  <button
                    className="text-rose-500 font-semibold w-1/6"
                    onClick={() => handleRemoveItem(notification.id)}
                  >
                    Xóa
                  </button>
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center" ref={footerRef}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handlePurchase}
          >
            Mua Hàng
          </button>
          <p className="font-semibold">Tổng số sản phẩm: {selectedIds.size}</p>
        </div>
      </div>
    </DrawerBase>
  );
};

export default NotificationsPanel;
