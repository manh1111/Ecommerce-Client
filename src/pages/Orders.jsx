// components
import PageHeader from "@layout/PageHeader";
import Select from "@ui/Select";
import OrdersAverageRate from "@widgets/OrdersAverageRate";
import OrdersInfobox from "@components/OrdersInfobox";
import OrdersTableShop from "@widgets/OrdersTableShop";
import Loader from "@components/Loader";

import { useState, useEffect } from "react";

import { PRODUCT_CATEGORIES, ORDER_SORT_OPTIONS } from "@constants/options";
import { getOrdersForShop } from "@api/order";

const Orders = () => {
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [sort, setSort] = useState(ORDER_SORT_OPTIONS[0]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [updatedOrders, setUpdatedOrders] = useState([]); 

  const orderStatuses = [
    { value: "", name: "Tất cả đơn hàng" },
    { value: "pending", name: "Chờ xử lý" },
    { value: "confirmed", name: "Đã xác nhận" },
    { value: "shipped", name: "Đang vận chuyển" },
    { value: "completed", name: "Đã giao hàng" },
    { value: "cancelled", name: "Đã hủy" },
    { value: "waiting", name: "Chờ thanh toán" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoader(true);
      try {
        const data = await getOrdersForShop(activeTab);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải đơn hàng. Vui lòng thử lại.");
      } finally {
        setLoader(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  const handleOrderUpdate = (orderId) => {
    setUpdatedOrders((prev) => [...prev, orderId]);
  };

  const filteredOrders = orders.filter(
    (order) => !updatedOrders.includes(order.id)
  );

  const renderStatusTabs = () =>
    orderStatuses.map((status) => (
      <button
        key={status.value}
        onClick={() => setActiveTab(status.value)}
        className={`py-2 px-4 rounded ${
          activeTab === status.value
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {status.name}
      </button>
    ));

  // Render the infobox widgets
  const renderInfoboxWidgets = () => (
    <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4">
      <OrdersInfobox
        title="Hoàn thành"
        count={2345}
        icon={<i className="icon-check-to-slot-solid" />}
      />
      <OrdersInfobox
        title="Đã xác nhận"
        count={323}
        color="green"
        icon={<i className="icon-list-check-solid" />}
      />
      <OrdersInfobox
        title="Đã hủy"
        count={17}
        color="red"
        icon={<i className="icon-ban-solid" />}
      />
      <OrdersInfobox
        title="Đã hoàn tiền"
        count={2}
        color="badge-status-bg"
        icon={<i className="icon-rotate-left-solid" />}
      />
    </div>
  );

  return (
    <>
      <PageHeader title="Đơn Hàng" />
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        {/* Order Status Tabs */}
        <div className="flex gap-4">{renderStatusTabs()}</div>

        {/* Filters Section */}
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] lg:grid-cols-4 lg:items-end xl:grid-cols-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] md:col-span-2">
            <Select
              value={category}
              options={PRODUCT_CATEGORIES}
              onChange={setCategory}
              placeholder="Danh mục sản phẩm"
            />
            <Select
              value={sort}
              options={ORDER_SORT_OPTIONS}
              onChange={setSort}
              placeholder="Sắp xếp mặc định"
            />
          </div>
        </div>

        {/* Widgets Section */}
        <div className="w-full widgets-grid grid-cols-1 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <OrdersAverageRate />
          </div>
          {renderInfoboxWidgets()}
        </div>

        {/* Orders Table or Loader */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <OrdersTableShop
            initialOrders={filteredOrders}
            category={category}
            sort={sort}
            onOrderUpdate={handleOrderUpdate} 
          />
        )}
      </div>
    </>
  );
};

export default Orders;
