// components
import Pagination from "@ui/Pagination";
import SellerGridItem from "@components/SellerGridItem";
import Select from "@ui/Select";

// hooks
import usePagination from "@hooks/usePagination";
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

// constants
import { SELLER_SORT_OPTIONS } from "@constants/options";

// utils
import { sortSellers } from "@utils/helpers";

// data placeholder
import sellers from "@db/sellers";

const SellerProfilesGrid = ({ numberOfSellers = 24, fullGrid = true }) => {
  const { width } = useWindowSize();
  const [sort, setSort] = useState(SELLER_SORT_OPTIONS[0]);
  const sortedSellers = sortSellers(sellers, sort.value);
  const pagination = usePagination(sortedSellers, numberOfSellers);

  const data = pagination.currentItems();

  useEffect(() => {
    pagination.setCurrentPage(0);
  }, [sort, numberOfSellers]);

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
        <p className="md:text-right">
        View profiles: {pagination.showingOf()}
        </p>
      </div>
      {fullGrid ? (
        <div
          className="flex-1 grid content-start gap-5 mt-4 mb-8 sm:grid-cols-2 md:grid-cols-3 md:gap-[26px]
                 md:mt-[27px] xl:grid-cols-5 2xl:grid-cols-6"
        >
          {data.map((seller, index) => (
            <SellerGridItem
              key={`${seller.id}-${index}`}
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
            />
            <SellerGridItem
              seller={data[1]}
              index={1}
              className="w-1/2 h-full"
            />
          </div>
          <div
            className="flex-1 grid content-start gap-5 grid-cols-2 md:gap-[26px]
                 grid-cols-2 pl-10"
          >
            {" "}
            {data.slice(2).map((seller, index) => (
              <SellerGridItem
                key={`${seller.id}-${index}`}
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
