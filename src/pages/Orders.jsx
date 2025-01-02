// components
import PageHeader from "../layout/PageHeader";
import OrdersInfobox from "../components/OrdersInfobox";
import OrdersTableShop from "../widgets/OrdersTableShop";
import Loader from "../components/Loader";

import { useState, useEffect } from "react";

import { PRODUCT_CATEGORIES, ORDER_SORT_OPTIONS } from "../constants/options";
import { getAllOrder } from "../api/order";

const Orders = () => {
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [sort, setSort] = useState(ORDER_SORT_OPTIONS[0]);
  const [orders, setOrders] = useState([]);
  const [AllOrders, setAllOrders] = useState([]);
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
    { value: "waiting", name: "Thanh toán" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoader(true);
      try {
        const data = await getAllOrder(activeTab);
        const allData = await getAllOrder();
        setOrders(data);
        setAllOrders(allData);
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

  // Count orders by status
  const countOrdersByStatus = (status) => {
    const order= AllOrders.filter((order) => order.order_status === status);
    return order.length;
  };

  const renderStatusTabs = () =>
    orderStatuses.map((status) => (
      <button
        key={status.value}
        onClick={() => setActiveTab(status.value)}
        className={`py-2 px-4 rounded-lg text-sm ${
          activeTab === status.value
            ? "bg-blue-500 text-white"
            : "bg-slate-100 text-gray-700 border-slate-200 border-2"
        }`}
      >
        {status.name}
      </button>
    ));

  console.log("first", AllOrders, countOrdersByStatus("completed"));
  // Render the infobox widgets with dynamic counts
  const renderInfoboxWidgets = () => (
    <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4">
      <OrdersInfobox
        title="Hoàn thành"
        count={countOrdersByStatus("completed")}
        icon={<i className="icon-check-to-slot-solid" />}
      />
      <OrdersInfobox
        title="Chờ xác nhận"
        count={countOrdersByStatus("confirmed")}
        color="badge-status-bg"
        icon={<i className="icon-rotate-left-solid" />}
      />
      <OrdersInfobox
        title="Đã xác nhận"
        count={countOrdersByStatus("confirmed")}
        color="green"
        icon={<i className="icon-list-check-solid" />}
      />
      <OrdersInfobox
        title="Đã hủy"
        count={countOrdersByStatus("cancelled")}
        color="red"
        icon={<i className="icon-ban-solid" />}
      />
    </div>
  );

  return (
    <>
      <PageHeader title="Đơn Hàng" />
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        <div className="w-full widgets-grid grid-cols-1 ">
          {renderInfoboxWidgets()}
        </div>

        <div className="flex gap-4">{renderStatusTabs()}</div>
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
