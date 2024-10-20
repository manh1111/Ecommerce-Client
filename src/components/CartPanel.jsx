import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import DrawerBase from "@ui/DrawerBase";
import { getCart } from "@api/cart";
import { getShopById } from "@api/shop";
import { getProductById } from "@api/product";
import Loading from "@components/Loading";
import { createOrder } from "@api/order"; 
import { Image } from "antd";
import { changeQuantityProduct, deleteProductById } from "../api/cart";
import { toast } from "react-toastify";

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
      <div className="flex-1 flex flex-row items-center gap-4">
        <img src={product.product_img} className="w-16 h-16 rounded-lg" />
        <div className="font-semibold text-xl">{product.product_name}</div>
      </div>
      <div className="flex flex-col text-end w-1/6 font-semibold">
        <span className="text-lg text-red-500">
          {product?.product_price?.toLocaleString("vi-VN") + "₫"}
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
        {(product.product_price * product.quantity).toLocaleString("vi-VN") +
          "₫"}
      </div>
      <div className="text-end w-1/6 flex justify-center">
        <button
          className="text-white bg-rose-500 rounded-xl px-4 py-2 hover:opacity-80"
          onClick={() => handleRemoveItem(product.productId)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

const ShopInfo = ({ shopId, shopName, shopLogo }) => {
  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 shadow-md rounded-lg bg-white w-full">
      <div className="flex flex-row items-center flex-1 gap-4">
        <img src={shopLogo} className="w-16 h-16 rounded-full " />
        <div className="text-xl font-extrabold text-gray-900 mt-2">
          {shopName}
        </div>
      </div>
    </div>
  );
};

const CartPanel = ({ open, onOpen, onClose }) => {
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [listProduct, setListProduct] = useState([]);
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
      console.log("Cart Data:", cartData);
      const productsByShop = {};

      await Promise.all(
        cartData.cart_products.map(async (item) => {
          const { shopId, productId, quantity } = item;
          const shopData = await getShopById(shopId);

          if (!productsByShop[shopId]) {
            productsByShop[shopId] = {
              shopId: shopData._id,
              shopName: shopData.shop_name,
              shopLogo: shopData.logo,
              products: [],
            };
          }

          const productDetails = await getProductById(productId);
          productsByShop[shopId].products.push({
            productId: productDetails._id,
            quantity,
            product_price: productDetails.product_price,
            product_name: productDetails.product_name,
            product_img: productDetails.product_img[0],
          });
        })
      );

      setListProduct(Object.values(productsByShop));
      setError(null);
    } catch (error) {
      console.error("Error fetching cart data:", error);
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
  
  const handleQuantityChange = async (id, delta) => {
    try {
      // Find the current product in the list
      const updatedProduct = listProduct.flatMap((shop) =>
        shop.products.filter((product) => product.productId === id)
      )[0];

      const oldQuantity = updatedProduct.quantity;
      const newQuantity = oldQuantity + delta;

      // Prevent the quantity from being less than 1
      if (newQuantity < 1) {
        toast.error("Số lượng không thể nhỏ hơn 1");
        return;
      }

      // Update the product quantity in the backend
      await changeQuantityProduct(id, newQuantity, oldQuantity);
      toast.success("Cập nhật số lượng thành công!");

      // Update the product quantity in the state
      setListProduct((prev) => {
        return prev.map((shop) => {
          shop.products = shop.products.map((item) =>
            item.productId === id
              ? {
                  ...item,
                  quantity: newQuantity,
                }
              : item
          );
          return shop;
        });
      });
    } catch (error) {
      toast.error("Cập nhật số lượng thất bại!");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteProductById(id);

      setListProduct((prev) => {
        return prev.map((shop) => {
          shop.products = shop.products.filter((item) => item.productId !== id);
          return shop;
        });
      });

      alert("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);

      alert("Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.");
    }
  };



  const calculateTotalPrice = () =>
    Array.from(selectedIds).reduce((total, id) => {
      let itemTotal = 0;
      listProduct.forEach((shop) => {
        const item = shop.products.find((product) => product.productId === id);
        if (item) {
          itemTotal += item.product_price * item.quantity;
        }
      });
      return total + itemTotal;
    }, 0);

  
  const handleBuyNow = async () => {
    const selectedProducts = Array.from(selectedIds)
      .map((id) => {
        for (const shop of listProduct) {
          const product = shop.products.find((prod) => prod.productId === id);
          if (product) {
            return {
              shopId: shop.shopId,
              shopName: shop.shopName,
              shopLogo: shop.shopLogo,
              productId: product.productId,
              quantity: product.quantity,
              price: product.product_price,
              productName: product.product_name,
              productThumb: product.product_img,
            };
          }
        }
      })
      .filter(Boolean);

    if (selectedProducts.length === 0) {
      return;
    }
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

    window.location.href = "/checkout";
  };

  return (
    <DrawerBase
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      width="650px"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
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
            <span className="font-semibold w-1/6">Tùy chọn</span>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            listProduct.map((shop) => (
              <div key={shop.shopId}>
                <ShopInfo
                  shopId={shop.shopId}
                  shopName={shop.shopName}
                  shopLogo={shop.shopLogo}
                />
                <div className="p-4">
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
              </div>
            ))
          )}
        </div>

        <div ref={footerRef} className="flex justify-between p-4 border-t">
          <div className="flex items-center">
            <span className="font-semibold">Tổng thanh toán:</span>
            <span className="text-2xl text-red-500 font-bold ml-2">
              {calculateTotalPrice().toLocaleString("vi-VN") + "₫"}
            </span>
          </div>
          <button
            onClick={handleBuyNow}
            className="text-white bg-blue-500 rounded-xl px-4 py-2 hover:opacity-80"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </DrawerBase>
  );
};

export default CartPanel;
