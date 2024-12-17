import eng from "@assets/flags/eng.webp";
import mc from "@assets/payment/mc.svg";
import visa from "@assets/payment/visa.svg";
import googlepay from "@assets/payment/googlepay.svg";
import applepay from "@assets/payment/applepay.svg";
import paypal from "@assets/payment/paypal.svg";
import bitpay from "@assets/payment/bitpay.svg";

export const PRODUCT_CATEGORIES = [
  { value: "all", label: "Tất cả sản phẩm" },
  {
    value: "electronics",
    label: "Điện tử",
    icon: "icon-laptop-mobile-solid",
    color: "accent",
  },
  {
    value: "food",
    label: "Thực phẩm",
    icon: "icon-burger-soda-solid",
    color: "header",
  },
  {
    value: "fashion",
    label: "Thời trang",
    icon: "icon-shirt-solid",
    color: "red",
  },
  {
    value: "services",
    label: "Dịch vụ",
    icon: "icon-user-gear-solid",
    color: "yellow",
  },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: "best-selling", label: "Bán chạy nhất" },
  { value: "available", label: "Có sẵn" },
  { value: "price-low-to-high", label: "Giá: Thấp đến Cao" },
  { value: "price-high-to-low", label: "Giá: Cao đến Thấp" },
];

export const SELLER_SORT_OPTIONS = [
  { value: "best-selling", label: "Bán chạy nhất" },
  { value: "rating-high-to-low", label: "Đánh giá: Cao đến Thấp" },
  { value: "rating-low-to-high", label: "Đánh giá: Thấp đến Cao" },
  { value: "a-z", label: "Theo tên: A-Z" },
  { value: "z-a", label: "Theo tên: Z-A" },
];

export const REVIEW_SORT_OPTIONS = [
  { value: "recent", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "rating-high-to-low", label: "Đánh giá cao đến thấp" },
  { value: "rating-low-to-high", label: "Đánh giá thấp đến cao" },
];

export const LOCALES = [{ value: "en-EN", label: "Tiếng Anh (EN)", icon: eng }];

export const APPS_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "development", label: "Công cụ phát triển" },
  { value: "marketplace", label: "Chợ điện tử" },
  { value: "finances", label: "Kế toán tài chính" },
];

export const PRODUCT_MANAGEMENT_OPTIONS = [
  { value: "publish", label: "Đã xuất bản" },
  { value: "drafted", label: "Bản nháp" },
  { value: "deleted", label: "Đã xóa" },
];

export const ORDER_SORT_OPTIONS = [
  { value: "default", label: "Sắp xếp mặc định" },
  { value: "a-z", label: "Theo tên: A-Z" },
  { value: "z-a", label: "Theo tên: Z-A" },
  { value: "rating-high-to-low", label: "Đánh giá cao đến thấp" },
  { value: "rating-low-to-high", label: "Đánh giá thấp đến cao" },
];

export const PAYMENT_OPTIONS = [
  { value: "mastercard", icon: mc },
  { value: "visa", icon: visa },
  { value: "googlepay", icon: googlepay },
  { value: "applepay", icon: applepay },
  { value: "paypal", icon: paypal },
  { value: "bitpay", icon: bitpay },
];

export const NOTIFICATION_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "follow", label: "Đang theo dõi" },
  { value: "order", label: "Đơn hàng" },
];

export const MESSAGE_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "latest", label: "Mới nhất" },
  { value: "archived", label: "Lưu trữ" },
];

export const STOCK_STATUS_OPTIONS = [
  { value: "in-stock", label: "Có sẵn" },
  { value: "low-inventory", label: "Hàng tồn kho thấp" },
  { value: "out-of-stock", label: "Hết hàng" },
  { value: "on-demand", label: "Theo yêu cầu" },
  { value: "unavailable", label: "Tạm thời không có sẵn" },
];

export const PRODUCT_TYPE_OPTIONS = [
  { value: "simple", label: "Sản phẩm đơn giản" },
  { value: "variable", label: "Sản phẩm thay đổi" },
  { value: "grouped", label: "Sản phẩm nhóm" },
  { value: "service", label: "Sản phẩm dịch vụ" },
];

export const TRANSACTIONS_SORT_OPTIONS = [
  { value: "recent", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
];

export const PRODUCT_SELLER_OPTIONS = [
  { value: "best-seller", label: "Bán chạy nhất" },
  { value: "new-seller", label: "Người bán mới" },
  { value: "top-rated", label: "Được đánh giá cao" },
  { value: "featured-seller", label: "Người bán nổi bật" },
];

export const PRODUCT_ADDITIONAL_OPTIONS = [
  { value: "last-modified", label: "Lần sửa đổi gần nhất" },
  { value: "date-added", label: "Ngày thêm vào" },
  { value: "last-viewed", label: "Lần xem gần nhất" },
  { value: "average-rating", label: "Đánh giá trung bình" },
  { value: "popularity", label: "Độ phổ biến" },
];

export const PROMOTIONAL_OPTIONS = [
  { value: "category-1", label: "Danh mục 1" },
  { value: "category-2", label: "Danh mục 2" },
  { value: "category-3", label: "Danh mục 3" },
  { value: "category-4", label: "Danh mục 4" },
  { value: "category-5", label: "Danh mục 5" },
];

export const UNITS_OPTIONS = [
  { value: "pcs", label: "Miếng" },
  { value: "box", label: "Hộp" },
  { value: "kg", label: "Kilogram" },
];
