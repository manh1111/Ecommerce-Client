import CalendarSelector from "@components/CalendarSelector";
import SalesProfitByCategory from "@widgets/SalesProfitByCategory";
import PeriodSalesRevenue from "@widgets/PeriodSalesRevenue";
import SellerProfileInfobox from "@components/SellerProfileInfobox";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import { getRevenueByShopOwn } from "../api/statistic";
import { statisticCategoryForShop } from "../api/categorie";
import { GetOwnShop } from "../api/shop";

const Boxes = ({ dataTotalRevenue, dataTotalOrders }) => {
  return (
    <div className="grid w-full grid-cols-2 gap-5">
      <SellerProfileInfobox value={dataTotalRevenue} label="Tổng lợi nhuận" />
      <SellerProfileInfobox
        icon="barcode"
        color="green"
        value={dataTotalOrders}
        label="Tổng đơn hàng"
        withCurrency={false}
      />
    </div>
  );
};

const SellerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopData, setShopData] = useState(null);
  const [dataTotalRevenue, setTotalRevenueData] = useState(0);
  const [dataTotalOrders, setTotalOrdersData] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [statisticCategory, setStatisticCategory] = useState([]);

  const [selectedDates, setSelectedDates] = useState({
    startDate: "2023-01-01",
    endDate: "2024-12-31",
  });

  const calculateGroupBy = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffInDays > 30 ? "month" : "day";
  };

  const fetchData = async (startDate, endDate) => {
    try {
      setLoading(true);
      const shopResponse = await GetOwnShop();
      setShopData(shopResponse);

      const groupBy = calculateGroupBy(startDate, endDate);
      const revenueResponse = await getRevenueByShopOwn({
        startDate,
        endDate,
        groupBy,
      });
      const categoryResponse = await statisticCategoryForShop();

      console.log("categoryResponse", categoryResponse);
      setStatisticCategory(categoryResponse);
      setRevenueData(revenueResponse.breakdown || []);
      setTotalRevenueData(revenueResponse.totalRevenue || 0);
      setTotalOrdersData(revenueResponse.totalOrders || 0);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDates.startDate, selectedDates.endDate);
  }, [selectedDates]);

  const handleDateChange = ({ startDate, endDate }) => {
    setSelectedDates({
      startDate,
      endDate,
    });
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  console.log("Shop Data", shopData);
  return (
    <>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 mb-5">
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <img
            src={shopData?.logo}
            alt={`${shopData?.shop_name} logo`}
            className="absolute top-6 left-6 w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="ml-32">
            <h1 className="text-3xl font-bold">{shopData?.shop_name}</h1>
            <p className="mt-1 text-sm italic">{shopData?.description}</p>
            <p className="mt-2 text-sm">
              <span className="font-medium">Trạng thái: </span>
              <span
                className={`px-2 py-1 rounded-full ${
                  shopData?.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {shopData?.status === "active"
                  ? "Hoạt động"
                  : "Ngừng hoạt động"}
              </span>
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase">Địa chỉ</h3>
              <p className="text-base text-gray-800">{shopData?.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase">Số điện thoại</h3>
              <p className="text-base text-gray-800">{shopData?.phone_number}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-5 lg:flex-row lg:justify-between">
        <CalendarSelector
          wrapperClass="md:max-w-[275px]"
          id="sellerPeriodSelector"
          onDateChange={handleDateChange}
          selectedDates={selectedDates}
        />
      </div>

      <div className="widgets-grid grid-cols-2 mb-10">
        <PeriodSalesRevenue revenueData={revenueData} />
        <div>
          <Boxes
            dataTotalRevenue={dataTotalRevenue}
            dataTotalOrders={dataTotalOrders}
          />
          <SalesProfitByCategory statisticCategory={statisticCategory} />
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
