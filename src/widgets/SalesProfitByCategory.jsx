import Spring from "@components/Spring";
import LabeledProgressBar from "@components/LabeledProgressBar";
import RatingStars from "@ui/RatingStars";
import { NavLink } from "react-router-dom";

// utils
import { getPercentage, numFormatter } from "@utils/helpers";
import { getReviewForShop } from "../api/review";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Hàm tạo màu ngẫu nhiên
const getRandomColor = () => {
  const colors = [
    "accent",
    "red",
    "header",
    "yellow",
    "green",
    "orange",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SalesProfitByCategory = ({ statisticCategory }) => {
  const { id } = useParams();
  const [review, setReviews] = useState([]);
  const statisticCategoryWithColor = statisticCategory.map((item) => {
    return { ...item, color: getRandomColor() };
  });

  const formattedData = statisticCategoryWithColor.map((item) => ({
    label: item.categoryName,
    value: item.totalRevenue, 
    color: item.color, 
  }));

  // Tính toán đánh giá trung bình từ các đánh giá
  const averageRating = review.length > 0
    ? review.reduce((sum, r) => sum + r.rating, 0) / review.length
    : 0;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewForShop = await getReviewForShop(id);
        setReviews(reviewForShop);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };

    getReviews();
  }, [id]);

  return (
    <Spring className="card flex flex-col">
      <h5 className="mb-4">Lợi nhuận theo danh mục</h5>
      <div className="flex flex-1 flex-col gap-[27px] justify-between">
        <div className="flex flex-col gap-4">
          {formattedData.length !== 0 ? formattedData.map((item, index) => (
            <LabeledProgressBar
              key={index}
              label={item.label} 
              value={getPercentage(formattedData, item.value)} 
              color={item.color} 
              displayValue={numFormatter(item.value, 2)} 
            />
          )) : <div className="text-rose-500 flex text-center text-xl w-full justify-center">Chưa có dữ liệu</div>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <h5>Đánh giá {averageRating} trên 5</h5>
            <RatingStars value={averageRating} />
          </div>
          <div className="sm:text-right">
          <p className="text-sm text-header sm:mb-1.5">Từ {review.length} người phản hồi</p>
            <NavLink className="text-btn" to={`/reviews/${id}`}>
              Xem tất cả đánh giá
            </NavLink>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default SalesProfitByCategory;
