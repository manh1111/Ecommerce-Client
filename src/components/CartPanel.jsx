import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import DrawerBase from "@ui/DrawerBase";
import { getCart } from "@api/cart";
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
        checked={selectedIds.has(product.productId)}
        onChange={() => handleSelectOne(product.productId)}
      />
      <div className="flex-1">
        <div className="font-semibold">{product.product_name}</div>
        <div className="text-sm text-gray-500">{product.product_desc}</div>
      </div>
      <div className="flex flex-col text-end w-1/6 font-semibold">
        <span className="text-lg text-red-500">
          {product.price.toLocaleString("vi-VN") + "₫"}
        </span>
      </div>
      <div className="text-end w-1/6 font-semibold flex items-end pl-6">
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(product.productId, -1)}
        >
          -
        </button>
        <span className="mx-2">{product.quantity || 1}</span>
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => handleQuantityChange(product.productId, 1)}
        >
          +
        </button>
      </div>
      <div className="w-1/6 font-semibold text-red-500 text-center">
        {(product.price * product.quantity).toLocaleString("vi-VN") + "₫"}
      </div>
      <div className="text-end w-1/6 flex justify-center">
        <button
          className="text-red-500 w-fit"
          onClick={() => handleRemoveItem(product.productId)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

const ShopInfo = ({ shopId, shopName }) => {
  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 shadow-md rounded-lg bg-white w-full">
      <div className="flex flex-col items-start flex-1">
        <div className="text-2xl font-extrabold text-gray-900 mt-2">
          {shopName}
        </div>
      </div>
    </div>
  );
};

const CartPanel = ({ open, onOpen, onClose }) => {
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [listProduct, setListProduct] = useState([]); // Changed to an array
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetchCartData();
    }
  }, [open]);

  const fetchCartData = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      const productsByShop = {};

      cartData.cart_products.forEach((item) => {
        const {
          shopId,
          productId,
          quantity,
          price,
          product_name,
          product_desc,
        } = item;

        // Initialize shop if it doesn't exist
        if (!productsByShop[shopId]) {
          productsByShop[shopId] = {
            shopId,
            shopName: "Shop " + shopId, // Placeholder for the shop name
            products: [],
          };
        }

        // Add product to the shop
        productsByShop[shopId].products.push({
          productId,
          quantity,
          price,
          product_name,
          product_desc,
        });
      });

      // Convert productsByShop object to an array
      setListProduct(Object.values(productsByShop));
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
    setListProduct((prev) => {
      return prev.map((shop) => {
        shop.products = shop.products.map((item) =>
          item.productId === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + delta),
              }
            : item
        );
        return shop;
      });
    });
  };

  const handleRemoveItem = (id) => {
    setListProduct((prev) => {
      return prev.map((shop) => {
        shop.products = shop.products.filter((item) => item.productId !== id);
        return shop;
      });
    });
  };

  const calculateTotalPrice = () =>
    Array.from(selectedIds).reduce((total, id) => {
      let itemTotal = 0;
      listProduct.forEach((shop) => {
        const item = shop.products.find((product) => product.productId === id);
        if (item) {
          itemTotal += item.price * item.quantity;
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
            aria-label="Close listProduct panel"
          >
            &times;
          </button>
        </div>
      </div>

      <div className="flex items-center border-b p-4">
        <input type="checkbox" className="mr-2" />
        <span className="font-semibold w-1/3">Sản phẩm</span>
        <span className="font-semibold w-1/6">Giá</span>
        <span className="font-semibold w-1/6">Số lượng</span>
        <span className="font-semibold w-1/6">Thành tiền</span>
        <span className="font-semibold w-1/6 text-center">Hành động</span>
      </div>

      {loading && <Loading />}

      {error && <div className="text-red-500">{error}</div>}

      {listProduct.map((shop) => (
        <div key={shop.shopId}>
          <ShopInfo shopId={shop.shopId} shopName={shop.shopName} />
          {shop.products.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              selectedIds={selectedIds}
              handleSelectOne={handleSelectOne}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      ))}

      <div className="flex justify-between items-center py-4 border-t mt-4">
        <div className="text-lg font-bold">Tổng cộng:</div>
        <div className="text-lg font-bold text-red-500">
          {calculateTotalPrice().toLocaleString("vi-VN") + "₫"}
        </div>
      </div>
    </DrawerBase>
  );
};

export default CartPanel;
