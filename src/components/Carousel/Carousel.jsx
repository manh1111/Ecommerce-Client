import React from "react";
import CarouselItem from "./CarouselItem"; // adjust the path as needed

const itemsData = [
  {
    href: "/top_products?catId=VN_BITL0_1930%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/abe71577bb007ceb38880b9db11eef56",
    salesText: "Bán 2k+ / tháng",
    productName: "Váy Yếm",
  },
  {
    href: "/top_products?catId=VN_BITL0_3376%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/eefa9c00d56b70ae7d2df993b7618b89",
    salesText: "Bán 20k+ / tháng",
    productName: "Đai Chống Gù Lưng",
  },
  {
    href: "/top_products?catId=VN_BITL0_1930%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/abe71577bb007ceb38880b9db11eef56",
    salesText: "Bán 2k+ / tháng",
    productName: "Váy Yếm",
  },
  {
    href: "/top_products?catId=VN_BITL0_3376%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/eefa9c00d56b70ae7d2df993b7618b89",
    salesText: "Bán 20k+ / tháng",
    productName: "Đai Chống Gù Lưng",
  },
  {
    href: "/top_products?catId=VN_BITL0_1930%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/abe71577bb007ceb38880b9db11eef56",
    salesText: "Bán 2k+ / tháng",
    productName: "Váy Yếm",
  },
  {
    href: "/top_products?catId=VN_BITL0_3376%3Atop_sold",
    imageSrc:
      "https://down-vn.img.susercontent.com/file/eefa9c00d56b70ae7d2df993b7618b89",
    salesText: "Bán 20k+ / tháng",
    productName: "Đai Chống Gù Lưng",
  },
];

const CarouselList = () => {
  return (
    <div className="overflow-x-auto">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {itemsData.map((item, index) => (
          <li key={index}>
            <CarouselItem
              href={item.href}
              imageSrc={item.imageSrc}
              salesText={item.salesText}
              productName={item.productName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarouselList;
