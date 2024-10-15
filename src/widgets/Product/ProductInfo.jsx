import React, { useState } from "react";
import { Button, Modal, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icons
import { addCart } from "@api/cart";
import { getCookie } from "@utils/cookie";
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductInfo = ({ product }) => {
  const [loadingCart, setLoadingCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => setOpen(false);

  const handleAddToCart = async () => {
    setLoadingCart(true);
    try {
      console.log(product.id);
      const response = await addCart(product.id, 1); 
      console.log(response)
      if (response?.status === 200) {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        toast.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setLoadingCart(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.mainImage.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.mainImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) {
    return <Skeleton active />;
  }

  return (
    <div className="w-full h-full mt-12 px-4 xl:px-8">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Product Images */}
        <div className="xl:w-1/2 w-full flex flex-col items-center justify-center gap-8 relative">
          <div className="w-full flex items-center justify-center relative">
            {/* Left Arrow for Previous Image */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-500 bg-gray-300 p-2 rounded-full"
            >
              <LeftOutlined style={{ fontSize: "24px" }} />
            </button>

            {/* Product Image */}
            {product?.mainImage?.map((image, index) => (
              <div
                key={index}
                className={`w-full flex items-center justify-center ${
                  index === currentImageIndex ? "block" : "hidden"
                }`}
              >
                <img
                  className="object-contain min-h-80 xl:h-[400px] h-fit w-auto"
                  src={image}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            ))}

            {/* Right Arrow for Next Image */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-gray-500 p-2 rounded-full bg-gray-300"
            >
              <RightOutlined style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="xl:w-1/2 w-full flex flex-col justify-between gap-6 px-4 xl:px-0">
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
            {loadingCart ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              <Button
                className="w-1/2"
                onClick={handleAddToCart}
                shape="round"
                size="large"
                style={{ borderColor: "#E0E0E0" }}
              >
                Thêm vào giỏ hàng
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

      {/* Modal for purchase confirmation */}
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

      {/* Product details section */}
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
