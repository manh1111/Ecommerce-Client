import { useEffect, useState } from "react";
import { getReviewForShop } from "../api/review";
import PageHeader from "../layout/PageHeader";
import LatestAcceptedReviews from "../widgets/LatestAcceptedReviews";
import Loader from "@components/Loader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [newPercentage, setNewPercentage] = useState(0);
  const [regularPercentage, setRegularPercentage] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewForShop();
        console.log("data", data);
        const reviewsData = data;

        // Process data
        setReviews(reviewsData);
        const total = reviewsData.length;
        const average =
          reviewsData.reduce((sum, review) => sum + review.rating, 0) / total;
        const newPercent = (25 / total) * 100;
        const regularPercent = (75 / total) * 100;

        setTotalReviews(total);
        setAverageRating(average.toFixed(1));
        setNewPercentage(newPercent);
        setRegularPercentage(regularPercent);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Đánh giá" />
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        {!reviews ? <LatestAcceptedReviews reviews={reviews} />
        : <div className="flex justify-center items-center text-red font-bold">Chưa có đánh giá nào trong shop của bạn</div>}
      </div>
    </>
  );
};

export default Reviews;
