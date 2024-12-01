import { getReviewForShop } from "@api/review";

let Reviews = [];

const fetchReviews = async () => {
  try {
    const fetchedReviews = await getReviewForShop();

    // Định dạng lại dữ liệu đánh giá
    Reviews = fetchedReviews.map((review, index) => ({
      id: review.id || `review-${index + 1}`,
      firstName: review.firstName || faker.name.firstName(),
      lastName: review.lastName || faker.name.lastName(),
      email: review.email || faker.internet.email(),
      img: review.img || `/assets/reviews/${index + 1}.webp`,
      rating: review.rating || Math.floor(Math.random() * 5) + 1,
      timestamp: review.timestamp || faker.date.recent(),
      text: review.text || faker.lorem.sentence(),
    }));
  } catch (error) {
    console.error("Error fetching reviews data:", error);
  }
};

const getReviews = () => Reviews;

export { fetchReviews };
export default getReviews;
