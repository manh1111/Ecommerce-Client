// components
import RatingStars from "@ui/RatingStars";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import Timestamp from "@ui/Timestamp";
import { NavLink } from "react-router-dom";
import Trend from "@ui/Trend";
import Counter from "@components/Counter";

// utils
import { getCategory, getStatusColor, numFormatter } from "@utils/helpers";
import dayjs from "dayjs";

export const ORDERS_COLUMN_DEFS = [
  {
    title: "# đơn hàng",
    dataIndex: "orderNumber",
    width: "100px",
    render: (text) => <span className="subheading-2">#{text}</span>,
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
    className: "product-cell",
    render: (product) => (
      <div className="flex gap-6">
        <div className="img-wrapper w-[70px] h-[64px] flex items-center justify-center shrink-0">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="flex-col hidden 2xl:flex">
          <h5 className="text-sm max-w-[195px] mb-1.5">{product.name}</h5>
          <div className="flex flex-col gap-1 text-sm">
            <p>Giá thường: ${product.regular_price}</p>
            {product.sale_price && <p>Giá khuyến mãi: ${product.sale_price}</p>}
          </div>
        </div>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "SKU",
    dataIndex: "sku",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    render: (category) => (
      <div className="flex items-center gap-4">
        <div
          className={`badge-icon badge-icon--sm bg-${
            getCategory(category).color
          }`}
        >
          <i className={`${getCategory(category).icon} text-base`} />
        </div>
        <span className="label-text">{getCategory(category).label}</span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Thanh toán",
    dataIndex: "payment",
    render: (payment) => {
      const status =
        payment.amount === payment.received
          ? "Đã thanh toán đầy đủ"
          : payment.amount > payment.received && payment.received !== 0
          ? "Thanh toán một phần"
          : "Chưa thanh toán";

      return (
        <div className="flex flex-col">
          <span className="font-heading font-bold text-header">
            {status !== "Đã thanh toán đầy đủ" && `$${payment.received} / từ `}$
            {payment.amount}
          </span>
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "status",
    render: (status) => (
      <span
        className="badge-status badge-status--lg"
        style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Đánh giá",
    dataIndex: "rating",
    render: (rating) => <RatingStars rating={rating} />,
    responsive: ["xl"],
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    width: "70px",
    render: () => (
      <div className="flex items-center justify-end gap-11">
        <NavLink to="/product-editor" aria-label="Chỉnh sửa">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </NavLink>
        <SubmenuTrigger />
      </div>
    ),
  },
];

export const TRANSACTIONS_COLUMN_DEFS = [
  {
    title: "Ngày & Giờ",
    dataIndex: "timestamp",
    render: (timestamp) => <Timestamp date={timestamp} />,
  },
  {
    title: "ID",
    dataIndex: "id",
    responsive: ["lg"],
  },
  {
    title: "Phương thức",
    dataIndex: "method",
    responsive: ["lg"],
  },
  {
    title: "Order id",
    dataIndex: "order_id",
    render: (order_id) => <span className="capitalize">{order_id}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status) => (
      <span
        className="badge-status"
        style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Tổng",
    dataIndex: "amount",
    render: (amount) => {
      return (
        <span className="font-heading font-semibold text-header">
          {amount} VND
        </span>
      );
    },
  },
];

export const SELLERS_COLUMN_DEFS = [
  {
    title: "Người bán",
    dataIndex: "seller",
    render: (text, record) => (
      <div className="flex gap-[26px]">
        <div className="img-wrapper flex items-center justify-center w-[63px] h-[63px] shrink-0">
          <img className="max-w-[50px]" src={record.logo} alt={record.name} />
        </div>
        <div className="flex flex-col items-start">
          <a
            className="subheading-2"
            href={record.website}
            target="_blank"
            rel="noreferrer"
          >
            www.website.com
          </a>
          <a className="mt-3 mb-2.5" href={`tel:${record.phone}`}>
            {record.phone}
          </a>
          <a href={`mailto:${record.email}`}>{record.email}</a>
        </div>
      </div>
    ),
  },
  {
    title: "Giá trị đơn hàng",
    dataIndex: "ordersValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={65874} />
        <span className="label-text mt-0.5 mb-2.5">Đơn hàng mới</span>
        <Trend value={55.96} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Giá trị thu nhập",
    dataIndex: "incomeValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={23000} prefix="$" isFormatted />
        <span className="label-text mt-0.5 mb-2.5">Thu nhập</span>
        <Trend value={14.56} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Tỷ lệ đánh giá",
    dataIndex: "rating",
    render: (rating) => <RatingStars rating={rating} />,
  },
  {
    title: "Giá trị các danh mục bán hàng",
    dataIndex: "salesCategoriesValue",
    render: (text, record) => (
      <div className="flex flex-col gap-2.5 max-w-[220px]">
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Điện tử</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.electronics, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Thời trang</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.fashion, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Thực phẩm & Đồ uống</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.food, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Dịch vụ</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.services, 2, "$")}
          </span>
        </div>
      </div>
    ),
  },
];


export const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: (
      <div className="flex items-center justify-center">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "image",
    width: 45,
    render: (image) => (
      <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
        <img src={image} alt="sản phẩm" />
      </div>
    ),
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    render: (text) => (
      <span className="inline-block h6 !text-sm max-w-[155px]">{text}</span>
    ),
  },
  { title: "SKU", dataIndex: "sku" },
  {
    title: "Tồn kho",
    dataIndex: "stock",
    width: 130,
    render: (stock) => (
      <div className="flex items-center gap-5">
        {stock == null ? (
          "Theo yêu cầu"
        ) : (
          <span>
            <span className={`${stock !== 0 ? "text-green" : "text-red"}`}>
              {stock !== 0
                ? stock >= 10
                  ? "Còn hàng "
                  : "Tồn kho thấp "
                : "Hết hàng "}
            </span>
            ({stock})
          </span>
        )}
      </div>
    ),
  },
  {
    title: "Giá",
    dataIndex: "price",
    render: (price) => <span>${price ? price.toFixed(2) : "0.00"}</span>,
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    render: (category) => (
      <button className="text-accent capitalize">{category}</button>
    ),
  },
  {
    title: "Đánh giá",
    dataIndex: "rateCount",
    render: (rateCount) => (
      <div className="flex items-center gap-2">
        <i
          className={`icon icon-star-${
            rateCount !== 0 ? "solid" : "regular"
          } text-lg leading-none`}
        />
        {rateCount !== 0 && <span className="mt-1">({rateCount})</span>}
      </div>
    ),
  },
  {
    title: "Ngày",
    dataIndex: "date",
    render: (date) => (
      <div className="flex flex-col">
        <span>Ngày sửa đổi:</span>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    render: () => (
      <div className="flex items-center justify-end gap-11">
        <NavLink to="/product-editor" aria-label="Chỉnh sửa">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </NavLink>
        <SubmenuTrigger />
      </div>
    ),
  },
];
