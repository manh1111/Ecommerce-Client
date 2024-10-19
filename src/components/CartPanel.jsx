import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import DrawerBase from "@ui/DrawerBase";
import { getCart } from "@api/cart";
import { getProductById } from "@api/product";
import { getShopById } from "@api/shop";
import Loading from "@components/Loading";

const ProductItem = ({
  product,
  selectedIds,
  handleSelectOne,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  return (
    <div className="flex items-center py-4 border-b">
      <input
        type="checkbox"
        className="mr-2"
        checked={selectedIds.has(product.id)}
        onChange={() => handleSelectOne(product.id)}
      />
      <img
        src={product.image}
        alt={product.title}
        className="w-16 h-16 object-cover mr-4 rounded-lg"
      />
      <div className="flex-1">
        <div className="font-semibold">
          {product.title.length > 15
            ? `${product.title.slice(0, 15)}...`
            : product.title}
        </div>
      </div>
      <div className="flex flex-col text-end w-1/6 font-semibold">
        <span className="text-lg text-red-500">{product.price}</span>
      </div>
      <div className="text-end w-1/6 font-semibold flex items-end pl-6">
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(product.id, -1)}
        >
          -
        </button>
        <span className="mx-2">{product.quantity || 1}</span>
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(product.id, 1)}
        >
          +
        </button>
      </div>
      <div className="w-1/6 font-semibold text-red-500 text-center">
        {product.total}
      </div>
      <div className="text-end w-1/6 flex justify-center">
        <button
          className="text-red-500 w-fit"
          onClick={() => handleRemoveItem(product.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

const ShopInfo = ({ shopData }) => {
  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 shadow-md rounded-lg bg-white w-full hover:shadow-lg transition-shadow duration-300">
      <a
        className="flex flex-col items-start flex-[1] group"
        href={shopData?.shopLink}
      >
        {shopData?.avatarUrl && (
          <img
            alt="icon head shot"
            className="w-20 h-20 rounded-full shadow-lg border border-gray-300 group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
            src={shopData.avatarUrl}
          />
        )}
        {shopData?.badgeImage && (
          <img
            alt="mall shop badge"
            src={shopData.badgeImage}
            className="w-20 h-5 mt-2"
          />
        )}
      </a>

      <div className="flex flex-col items-start pr-6 border-r border-gray-200 flex-[1.5]">
        {shopData?.sellerName && (
          <div className="text-2xl font-extrabold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors duration-300">
            {shopData.sellerName}
          </div>
        )}
      </div>
    </div>
  );
};

const CartPanel = ({ open, onOpen, onClose }) => {
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(new Map());
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setFilter("all");
      setSelectedIds(new Set());
      fetchCartData();
    }
  }, [open]);

  const fetchCartData = async () => {
    setLoading(true);
    try {
      const cartItems = await getCart();
      const productIds = cartItems.cart_products.map((item) => item.productId);
      const cartQuantities = cartItems.cart_products.reduce((acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      }, {});

      const productsByShop = new Map();
      await Promise.all(
        productIds.map(async (id) => {
          const productDetails = await getProductById(id);
          if (!productDetails) return;

          const shopId = productDetails.shop_id._id;
          if (!productsByShop.has(shopId)) {
            const shopData = await getShopById(shopId);
            productsByShop.set(shopId, {
              shopId: shopId,
              shopName: shopData.shop_name,
              avatarUrl: shopData.logo,
              badgeImage: shopData.badge,
              products: [],
            });
          }

          const product = {
            id: id,
            title: productDetails.product_name,
            category: productDetails.category_id || "Uncategorized",
            image: productDetails.product_img[0],
            price: productDetails.product_price.toLocaleString("vi-VN") + "₫",
            total:
              (
                productDetails.product_price * (cartQuantities[id] || 1)
              ).toLocaleString("vi-VN") + "₫",
            quantity: cartQuantities[id] || 1,
          };
          productsByShop.get(shopId).products.push(product);
        })
      );

      setNotifications(productsByShop);
      setError(null);
    } catch (error) {
      setError("Failed to load cart data");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleQuantityChange = (id, delta) => {
    setNotifications((prev) => {
      const updatedNotifications = new Map(prev);
      updatedNotifications.forEach((shop) => {
        shop.products = shop.products.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + delta),
                total:
                  (
                    parsePrice(item.price) * Math.max(1, item.quantity + delta)
                  ).toLocaleString("vi-VN") + "₫",
              }
            : item
        );
      });
      return updatedNotifications;
    });
  };

  const handleRemoveItem = (id) => {
    setNotifications((prev) => {
      const updatedNotifications = new Map(prev);
      updatedNotifications.forEach((shop) => {
        shop.products = shop.products.filter((item) => item.id !== id);
      });
      return updatedNotifications;
    });
  };

  const parsePrice = (priceStr) =>
    parseInt(priceStr.replace(/₫|\.|,/g, "")) || 0;

  const calculateTotalPrice = () =>
    Array.from(selectedIds).reduce((total, id) => {
      let itemTotal = 0;
      notifications.forEach((shop) => {
        const item = shop.products.find((product) => product.id === id);
        if (item) {
          itemTotal = parsePrice(item.total);
        }
      });
      return total + itemTotal;
    }, 0);

  return (
    <DrawerBase
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      width="650px"
    >
      <div className="pt-8 px-8 pb-4" ref={headerRef}>
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold">Giỏ Hàng</h5>
          <button
            className="text-red-500 text-2xl transition hover:text-red-700"
            onClick={onClose}
            aria-label="Close notifications panel"
          >
            &times;
          </button>
        </div>
      </div>

      <div className="flex items-center border-b p-4">
        <input type="checkbox" className="mr-2" />
        <span className="font-semibold w-1/3">Sản Phẩm</span>
        <span className="font-semibold w-1/6 text-center">Giá</span>
        <span className="font-semibold w-1/6 text-center">Số Lượng</span>
        <span className="font-semibold w-1/6 text-center">Tổng Tiền</span>
        <span className="font-semibold w-1/6 text-center">Hành Động</span>
      </div>

      <div
        className="overflow-auto"
        style={{ maxHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
      >
        {loading ? (
          <div className="p-8">
            <Loading />
          </div>
        ) : error ? (
          <div className="p-8 text-red-500">{error}</div>
        ) : (
          Array.from(notifications.keys()).map((shopId) => {
            const shopData = notifications.get(shopId);
            return (
              <div key={shopId} className="mb-6">
                {/* Shop Info */}
                <ShopInfo shopData={shopData} />

                {/* Products List */}
                {shopData.products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    selectedIds={selectedIds}
                    handleSelectOne={handleSelectOne}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>

      <div className="p-8" ref={footerRef}>
        <div className="font-semibold text-lg text-red-500">
          Tổng Cộng: {calculateTotalPrice().toLocaleString("vi-VN")}₫
        </div>
      </div>
    </DrawerBase>
  );
};

export default CartPanel;
