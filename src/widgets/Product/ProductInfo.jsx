import React, { useState } from "react";
import { Button, Modal, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductInfo = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
    toast.info(
      `Bạn đang mua sản phẩm này với giá ${
        product.sale_price ? VND.format(product.sale_price) : "Miễn phí"
      }`
    );
  };
  const handleCancel = () => setOpen(false);
  const handleFavorite = () => {
    setLoadingFavorite(true);
    setTimeout(() => {
      setIsFavorited((prev) => !prev);
      toast.success(isFavorited ? "Đã bỏ yêu thích" : "Đã thêm vào yêu thích");
      setLoadingFavorite(false);
    }, 1000);
  };

  if (!product) {
    return <Skeleton active />;
  }

  return (
    <div className="w-full h-full mt-12 px-4 xl:px-8">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Ảnh sản phẩm */}
        <div className="xl:w-1/2 w-full flex flex-col items-center justify-center gap-8">
          <div className="w-full flex items-center justify-center">
            <img
              className="object-contain h-80 xl:h-[400px] w-auto"
              src={product.mainImage.src}
              alt={product.mainImage.alt}
            />
          </div>
          <div className="flex items-center justify-around w-full border-t border-gray-300 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Chia sẻ:</span>
              {/* Thêm biểu tượng mạng xã hội ở đây */}
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              {loadingFavorite ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : isFavorited ? (
                <svg width="24" height="24" fill="none">
                  <path
                    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 4.16 12 5.57C13.09 4.16 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
                    fill="#F44336"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none">
                  <path
                    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 4.16 12 5.57C13.09 4.16 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
                    fill="#F44336"
                  />
                </svg>
              )}
              <span className="text-xs">{product.favorites}</span>
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="xl:w-1/2 w-full flex flex-col gap-6 px-4 xl:px-0">
          <div className="text-2xl font-bold mb-2">{product.name}</div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-lg font-semibold text-red-600">
              {product.sale_price ? VND.format(product.sale_price) : "Miễn phí"}
            </div>
            {product.sale_price && (
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-semibold">
                Giảm giá:{" "}
                {Math.round(100 - (product.sale_price / product.price) * 100)}%
              </div>
            )}
          </div>
          {product.price && (
            <div className="text-lg text-gray-500 line-through mb-4">
              {VND.format(product.price)}
            </div>
          )}
          <div className="flex flex-col gap-4 mb-6">
            <div className="text-xl font-bold">Chính sách Trả hàng</div>
            <section className="flex items-center gap-4">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg"
                alt="Return policy"
                className="w-8 h-8"
              />
              <div>
                <div className="text-lg font-semibold">Trả hàng 15 ngày</div>
                <div className="text-lg">Đổi ý miễn phí</div>
              </div>
              <img
                alt="icon help"
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/be6f27f93268c0f88ded.svg"
                className="w-8 h-8"
              />
            </section>
          </div>
          <div className="flex gap-4">
            {loadingFavorite ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              <Button
                className="w-1/2"
                onClick={handleFavorite}
                shape="round"
                size="large"
                style={{ borderColor: isFavorited ? "#F44336" : "#E0E0E0" }}
              >
                {isFavorited ? "Bỏ yêu thích" : "Yêu thích"}
              </Button>
            )}
            <Button
              className="w-1/2"
              type="primary"
              onClick={showModal}
              shape="round"
              size="large"
            >
              Mua Ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận mua sản phẩm */}
      <Modal
        title="Xác nhận mua sản phẩm"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="text-center">
          <p className="text-lg">Bạn đang mua sản phẩm này với giá:</p>
          <p className="text-2xl font-bold text-red-600">
            {product.sale_price ? VND.format(product.sale_price) : "Miễn phí"}
          </p>
          <div className="flex justify-end mt-4">
            <Button type="primary" onClick={handleCancel} shape="round">
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>

      {/* Khối chi tiết sản phẩm */}
      <div className="mt-8">
        <section>
          <h2 className="text-xl font-bold mb-4">CHI TIẾT SẢN PHẨM</h2>
          <div className="flex flex-col gap-6">
            <div className="text-lg font-semibold mb-2">Thông tin sản phẩm</div>
            <div className="text-lg mb-4">{product.description}</div>
            <div className="text-lg font-semibold mb-2">Hướng dẫn sử dụng</div>
            <div className="text-lg">{product.usage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductInfo;
