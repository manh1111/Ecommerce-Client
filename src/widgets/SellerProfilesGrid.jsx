// components
import Pagination from "@ui/Pagination";
import SellerGridItem from "@components/SellerGridItem";

// hooks
import usePagination from "@hooks/usePagination";
import { useState, useEffect } from "react";

// constants
import { SELLER_SORT_OPTIONS } from "@constants/options";

// utils
import { sortSellers } from "@utils/helpers";
import { GetAllShop } from "@api/shop";
import Loader from "@components/Loader";

const SellerProfilesGrid = ({ numberOfSellers = 24, fullGrid = false }) => {
  const [sort, setSort] = useState(SELLER_SORT_OPTIONS[0]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const pagination = usePagination(sellers, numberOfSellers);
  const data = pagination.currentItems();

  // Fetch sellers data from API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoader(true);
        const response = await GetAllShop();

        // Kiểm tra cấu trúc dữ liệu
        if (response.status == 200) {
          const convertData = (data) => {
            const sellers = data?.map((shop, index) => ({
              id: shop?._id, 
              logo: shop?.logo, 
              name: shop?.shop_name, 
              website: "https://1.envato.market/tf-merkulove",
              address: shop?.address, 
              phone: shop?.phone_number, 
              email: `${shop?.shop_name
                .replace(/\s+/g, "")
                .toLowerCase()}@example.com`, 
              rating: Math.random() * 5, 
              profit: {
                electronics: Math.floor(Math.random() * 100000),
                fashion: Math.floor(Math.random() * 100000),
                food: Math.floor(Math.random() * 100000),
                services: Math.floor(Math.random() * 100000), 
              },
              sales: Math.floor(Math.random() * 100000), 
            }));
            console.log("sellerssellers", sellers);
            return sellers;
          };
          setSellers(sortSellers(response.data, sort.value));
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load seller data", err);
      } finally {
        setLoader(false);
      }
    };

    fetchSellers();
  }, [sort]);

  useEffect(() => {
    pagination.setCurrentPage(0);
  }, [sort, numberOfSellers]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <p className="md:text-right">Xem hồ sơ: {pagination.showingOf()}</p>
      </div>
      <div
        className="flex-1 grid content-start gap-5 mt-4 mb-8 sm:grid-cols-2 md:grid-cols-3 md:gap-[26px]
                 md:mt-[27px] xl:grid-cols-5 2xl:grid-cols-6"
      >
        {data.map((seller, index) => (
          <SellerGridItem
            key={`${seller.id}-${index}`}
            id={seller._id}
            seller={seller}
            index={index}
          />
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default SellerProfilesGrid;
