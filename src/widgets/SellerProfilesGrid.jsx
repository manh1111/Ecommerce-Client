// components
import Pagination from "@ui/Pagination";
import SellerGridItem from "@components/SellerGridItem";
import Select from "@ui/Select";

// hooks
import usePagination from "@hooks/usePagination";
import { useState, useEffect } from "react";

// constants
import { SELLER_SORT_OPTIONS } from "@constants/options";

// utils
import { sortSellers } from "@utils/helpers";
import { GetAllShop } from "@api/shop";

const SellerProfilesGrid = ({ numberOfSellers = 24, fullGrid = true }) => {
  const [sort, setSort] = useState(SELLER_SORT_OPTIONS[0]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pagination = usePagination(sellers, numberOfSellers);
  const data = pagination.currentItems();

  // Fetch sellers data from API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
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
          const sellers = convertData(response.data);
          setSellers(sortSellers(response.data, sort.value));
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load seller data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [sort]);

  useEffect(() => {
    pagination.setCurrentPage(0);
  }, [sort, numberOfSellers]);

  if (loading) return <p>Loading sellers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col-reverse w-1/5 md:flex-col md:gap-2">
          <Select
            options={SELLER_SORT_OPTIONS}
            value={sort}
            onChange={setSort}
          />
        </div>
        <p className="md:text-right">View profiles: {pagination.showingOf()}</p>
      </div>
      {fullGrid ? (
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
      ) : (
        <div className="grid mt-5 md:grid-cols-2 gap-4 h-full">
          <div className=" flex flex-col justify-between h-full">
            <SellerGridItem
              seller={data[0]}
              index={0}
              className="w-1/2 h-full"
              id={data[0]._id}
            />
            <SellerGridItem
              seller={data[1]}
              index={1}
              className="w-1/2 h-full"
              id={data[1]._id}
            />
          </div>
          <div
            className="flex-1 grid content-start gap-5 md:gap-[26px]
                 grid-cols-2 pl-10"
          >
            {data.slice(2).map((seller, index) => (
              <SellerGridItem
                key={`${seller.id}-${index}`}
                id={seller._id}
                seller={seller}
                index={index + 1}
                className="w-full h-full"
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end mt-5">
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default SellerProfilesGrid;
