import React, { useState } from "react";
import { Button, Image, Modal, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icons
import { addCart } from "@api/cart";
import { getCookie } from "@utils/cookie";

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductInfo = ({ product, shopData }) => {
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
      const response = await addCart(product.id, 1);
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

  const handleBuyNow = () => {
    const productData = {
      shopId: shopData.id,
      shopName: shopData.sellerName,
      shopLogo: shopData.avatarUrl,
      productId: product.id,
      quantity: 1,
      price: product.price,
      productName: product.name,
      productThumb: product.mainImage[0],
    };

    // Store the product data in local storage
    localStorage.setItem("selectedProducts", JSON.stringify([productData]));

    // Redirect to checkout page
    window.location.href = "/checkout";
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
              className="z-30 absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-slate-100 p-2 rounded-full bg-slate-200"
            >
              <LeftOutlined style={{ fontSize: "24px" }} />
            </button>

            <div className="w-11/12">
              {/* Product Image */}
              {product?.mainImage?.map((image, index) => (
                <div
                  key={index}
                  className={`w-full flex items-center justify-center ${
                    index === currentImageIndex ? "block" : "hidden"
                  }`}
                >
                  <Image
                    className="object-contain min-h-80 xl:h-[400px] h-fit w-fit"
                    src={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow for Next Image */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-slate-100 p-2 rounded-full bg-slate-200"
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
              <Image
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
              <div className="w-1/2 flex items-center">
                <Spin
                  className="w-fit"
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
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
              onClick={handleBuyNow} // Updated to handleBuyNow
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
