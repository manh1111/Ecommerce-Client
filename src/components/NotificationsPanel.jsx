import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import DrawerBase from "@ui/DrawerBase";
import { getCookie } from "@utils/cookie";
import { getCart } from "@api/cart";
import { getProductById } from "@api/product";
import { getShopById } from "@api/shop";
import ShopInfo from "@widgets/Product/ShopInfo";

const ProductItem = ({
  notification,
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
        checked={selectedIds.has(notification.id)}
        onChange={() => handleSelectOne(notification.id)}
      />
      <img
        src={notification.image}
        alt={notification.title}
        className="w-16 h-16 object-cover mr-4 rounded-lg"
      />
      <div className="flex-1">
        <div className="font-semibold">
          {notification.title.length > 15
            ? `${notification.title.slice(0, 15)}...`
            : notification.title}
        </div>
        <div className="mt-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mr-2">
            {notification.label}
          </span>
        </div>
      </div>
      <div className="flex flex-col text-end w-1/6 font-semibold">
        <span className="text-lg text-red-500">{notification.price}</span>
      </div>
      <div className="text-end w-1/6 font-semibold flex items-end">
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(notification.id, -1)}
        >
          -
        </button>
        <span className="mx-2">{notification.quantity || 1}</span>
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(notification.id, 1)}
        >
          +
        </button>
      </div>
      <div className="w-1/6 font-semibold text-red-500 text-center">
        {notification.total}
      </div>
      <div className="text-end w-1/6">
        <button
          className="text-red-500"
          onClick={() => handleRemoveItem(notification.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

const NotificationsPanel = ({ open, onOpen, onClose }) => {
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shop, setShopData] = useState(null)
  
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

      const productsByShop = {};
      await Promise.all(
        productIds.map(async (id) => {
          const productDetails = await getProductById(id);
          if (!productDetails) return; // Handle missing product details

          const shopId = productDetails.shop_id._id;
          const shopData = await getShopById(shopId);
          setShopData(shopData);
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
            label: "New",
            timestamp: Date.now(),
            stock: productDetails.product_quantity,
            quantity: cartQuantities[id] || 1,
          };

          if (!productsByShop[shopId]) {
            productsByShop[shopId] = {
              shopId: shopId,
              shopName: productDetails.shop_id.shop_name,
              products: [],
            };
          }

          productsByShop[shopId].products.push(product);
        })
      );

      setNotifications(
        Object.values(productsByShop).flatMap((shop) => shop.products)
      ); // Flatten to get all products
      setError(null);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Failed to load cart data");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = () =>
    notifications.filter(
      (notification) => filter === "all" || notification.category === filter
    );

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedIds(
      isChecked ? new Set(filteredData().map((item) => item.id)) : new Set()
    );
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleQuantityChange = (id, delta) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) + delta),
              total:
                (
                  parsePrice(item.price) *
                  Math.max(1, (item.quantity || 1) + delta)
                ).toLocaleString("vi-VN") + "₫",
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  const handlePurchase = () => {
    if (selectedIds.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
      return;
    }
    alert(`Đã mua ${selectedIds.size} sản phẩm thành công!`);
    setNotifications((prev) =>
      prev.filter((item) => !selectedIds.has(item.id))
    );
    setSelectedIds(new Set());
  };

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/₫|\.|,/g, "")) || 0;
  };

  const isAllSelected =
    filteredData().length > 0 &&
    filteredData().every((item) => selectedIds.has(item.id));

  const calculateTotalPrice = () => {
    return Array.from(selectedIds).reduce((total, id) => {
      const item = notifications.find((notification) => notification.id === id);
      return total + (item ? parsePrice(item.total) : 0);
    }, 0);
  };

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

      <div className="p-4">
        {loading ? (
          <p className="text-center">Đang tải giỏ hàng...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {filteredData().map((notification) => {
              // Assuming each notification contains a shopId to fetch the shop data
              const shopInfo = {
                backgroundUrl: shop?.logo || "",
                Desc: shop?.description || "No description available",
                avatarUrl: shop?.logo || "",
                productCount: shop?.productsCount || getRandomNumber(10, 100),
                followerCount: shop?.followerCount || getRandomNumber(10, 100),
                followingCount: shop?.followingCount || getRandomNumber(10, 100),
                sellerName: shop?.shop_name || "Unknown Seller",
                joinDate:
                  new Date(shop?.createdAt).toLocaleDateString("vi-VN") ||
                  "Unknown",
              };

              return (
                <div key={notification.id}>
                  <ShopInfo shopData={shopInfo} /> 
                  <ProductItem
                    notification={notification}
                    selectedIds={selectedIds}
                    handleSelectOne={handleSelectOne}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="px-8 pb-4" ref={footerRef}>
        <div className="flex justify-between items-center border-t pt-4">
          <div className="font-bold">
            Tổng Giá:{" "}
            <span className="text-red-500">
              {calculateTotalPrice().toLocaleString("vi-VN")}₫
            </span>
          </div>
          <button
            className="bg-red-500 text-white rounded px-4 py-2"
            onClick={handlePurchase}
          >
            Mua Hàng
          </button>
        </div>
      </div>
    </DrawerBase>
  );
};

export default NotificationsPanel;
