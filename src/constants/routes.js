const ROUTES = [
  {
    name: "Thống kê",
    icon: "chart-simple-regular",
    path: "/statistical",
  },
  {
    name: "Sản phẩm",
    icon: "boxes-stacked-regular",
    path: "/products-management",
    links: [
      { name: "Quản lý sản phẩm", path: "/products-management" },
      { name: "Danh mục hàng", path: "/catalog" },
    ],
  },
  {
    name: "Đơn hàng",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Đánh giá",
    icon: "star-half-stroke-solid",
    path: "/reviews",
  },
  {
    name: "Khách hàng",
    icon: "chart-user-regular",
    path: "/customers",
  },
  {
    name: "Giao dịch",
    icon: "money-check-dollar-pen-regular",
    path: "/transactions",
  },
];

export default ROUTES;
