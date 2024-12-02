// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import Review from "@components/Review";
import Pagination from "@ui/Pagination";

// hooks
import { useEffect, useState } from "react";
import usePagination from "@hooks/usePagination";

// constants
import { REVIEW_SORT_OPTIONS } from "@constants/options";

// API
import { getReviewForShop } from "@api/review";

const LatestAcceptedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState(REVIEW_SORT_OPTIONS[0]);
  const [loading, setLoader] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoader(true);
        const fetchedReviews = await getReviewForShop();
        const formattedReviews = fetchedReviews.map((review, index) => ({
          id: review.id || `review-${index + 1}`,
          firstName: review.firstName || "Anonymous",
          lastName: review.lastName || "",
          email: review.email || "",
          img: review.img || `/assets/reviews/${index + 1}.webp`,
          rating: review.rating || 0,
          timestamp: review.timestamp || Date.now(),
          text: review.text || "No review content provided.",
        }));
        setReviews(formattedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchReviews();
  }, []);

  // Sort reviews
  const sortedData = reviews.sort((a, b) => {
    if (sort.value === "recent") {
      return b.timestamp - a.timestamp;
    } else if (sort.value === "oldest") {
      return a.timestamp - b.timestamp;
    } else if (sort.value === "rating-high-to-low") {
      return b.rating - a.rating;
    } else if (sort.value === "rating-low-to-high") {
      return a.rating - b.rating;
    }

    return 0;
  });

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
          {loading ? (
            <p className="text-center p-4">Loader reviews...</p>
          ) : (
            pagination
              .currentItems()
              .map((review, index) => (
                <Review
                  key={`${sort}-${review.id}`}
                  data={review}
                  index={index}
                />
              ))
          )}
        </div>
      </div>
      {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
    </Spring>
  );
};

export default LatestAcceptedReviews;
