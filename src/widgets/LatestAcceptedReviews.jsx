// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import Review from "@components/Review";
import Pagination from "@ui/Pagination";

// hooks
import { useState } from "react";
import usePagination from "@hooks/usePagination";

// constants
import { REVIEW_SORT_OPTIONS } from "@constants/options";

const LatestAcceptedReviews = ({ reviews }) => {
  console.log("reviews", reviews);
  const [sort, setSort] = useState(REVIEW_SORT_OPTIONS[0]);

  // Sort the reviews based on the selected sort option
  const sortedData = [...reviews].sort((a, b) => {
    if (sort.value === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sort.value === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sort.value === "rating-high-to-low") {
      return b.rating - a.rating;
    } else if (sort.value === "rating-low-to-high") {
      return a.rating - b.rating;
    }

    return 0;
  });

  // Apply pagination to the sorted data
  const pagination = usePagination(sortedData, 4);

  return (
    <Spring className="flex flex-1 flex-col gap-[26px]">
      <div className="card !p-0 flex-1">
        <div className="flex flex-col p-5 gap-2.5 md:flex-row md:justify-between md:items-center md:px-[26px]">
          <h5>Latest Accepted Reviews</h5>
          <Select
            value={sort}
            onChange={setSort}
            options={REVIEW_SORT_OPTIONS}
            variant="minimal"
          />
        </div>
        <span className="block h-[1px] bg-input-border opacity-60" />
        <div>
          {pagination.currentItems().map((review, index) => (
            <Review
              key={`${sort.value}-${review._id}`}
              data={{
                id: review._id,
                product: review.product_id,
                user: review.user_id,
                rating: review.rating,
                comment: review.comment,
                date: new Date(review.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }}
              index={index}
            />
          ))}
        </div>
      </div>
      {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
    </Spring>
  );
};

export default LatestAcceptedReviews;
