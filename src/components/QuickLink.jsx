import React from "react";

const QuickLink = () => {
  const links = [
    {
      href: "/VoucherXtra",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi",
      alt: "Voucher Giảm Đến 1 Triệu",
      title: "Voucher Giảm Đến 1 Triệu",
    },
    {
      href: "/mien-phi-van-chuyen",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi",
      alt: "Miễn Phí Ship - Có Shopee",
      title: "Miễn Phí Ship - Có Shopee",
    },
    {
      href: "/Shopee-Choice",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-5bf65d4dc0eb8f6b42074751e8b736a7_xhdpi",
      alt: "Shopee Choice Mua Nhiều Giảm Sâu",
      title: "Shopee Choice Mua Nhiều Giảm Sâu",
    },
    {
      href: "/ma-giam-gia",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi",
      alt: "Mã Giảm Giá",
      title: "Mã Giảm Giá",
    },
    {
      href: "/shopee-sieu-re",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-91399a1d3ed283d272b069fac5ca989c_xhdpi",
      alt: "Shopee Siêu Rẻ",
      title: "Shopee Siêu Rẻ",
    },
    {
      href: "/shopee-style",
      imgSrc:
        "https://cf.shopee.vn/file/vn-50009109-c02353c969d19918c53deaa4ea15bdbe_xhdpi",
      alt: "Shopee Style Voucher 40%",
      title: "Shopee Style Voucher 40%",
    },
    {
      href: "/sandealquocte",
      imgSrc:
        "https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi",
      alt: "Hàng Quốc Tế",
      title: "Hàng Quốc Tế",
    },
    {
      href: "/digitalproduct",
      imgSrc:
        "https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi",
      alt: "Nạp Thẻ, Dịch Vụ & Vé Máy Bay",
      title: "Nạp Thẻ, Dịch Vụ & Vé Máy Bay",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex w-full justify-between">
        {links.map((link, index) => (
          <a href={link.href} key={index} className="flex justify-center">
            <div className="quick-link-item w-[150px] flex flex-col items-center">
              <img
                className="w-[45px] h-[45px]"
                src={link.imgSrc}
                alt={link.title}
              />
              <div className="title text-center mt-2">{link.title}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLink;
