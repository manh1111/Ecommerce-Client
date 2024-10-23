import { useEffect, useState } from "react";
import PageHeader from "@layout/PageHeader";
import { createOrder } from "@api/order";
import { getAllAddresses } from "@api/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component to display shop information
const ShopInfo = ({ shopName, shopLogo }) => {
  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 shadow-md rounded-lg bg-white w-full mb-4">
      <div className="flex flex-row items-center flex-1 gap-4">
        <img src={shopLogo} alt={shopName} className="w-16 h-16 rounded-full" />
        <div className="text-xl font-extrabold text-gray-900">{shopName}</div>
      </div>
    </div>
  );
};

const Checkout = ({ listProduct = [], selectedIds = [] }) => {
  let paymentMethod = "cod";
  const [groupedProducts, setGroupedProducts] = useState({});
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [paymentGateway, setPaymentGateway] = useState("cod");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAllAddresses();
        setAddresses(response.data || []);
        console.log("getAllAddresses", response);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        toast.error("Không thể tải danh sách địa chỉ. Vui lòng thử lại.");
      }
    };

    fetchAddresses(); // Fetch addresses on component mount

    const storedProducts = localStorage.getItem("selectedProducts");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const grouped = products.reduce((acc, product) => {
        if (!acc[product.shopId]) {
          acc[product.shopId] = {
            shopId: product.shopId,
            shopName: product.shopName,
            shopLogo: product.shopLogo,
            products: [],
          };
        }
        acc[product.shopId].products.push(product);
        return acc;
      }, {});
      setGroupedProducts(grouped);
    }
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBuyNow = async () => {
    setLoading(true); // Set loading state
    try {
      const storedProducts = localStorage.getItem("selectedProducts");
      console.log("groupedProducts", storedProducts);
      if (storedProducts) {
        const products = JSON.parse(storedProducts);

        // Group products by shopId
        const groupedOrders = products.reduce((acc, product) => {
          const {
            shopId,
            productId,
            quantity,
            price,
            productName,
            productThumb,
          } = product;

          if (!acc[shopId]) {
            acc[shopId] = {
              shopId,
              products: [],
              totalPrice: 0,
            };
          }

          acc[shopId].products.push({
            productId,
            quantity,
            price,
            product_name: productName,
            product_thumb: productThumb,
          });

          acc[shopId].totalPrice += price * quantity;

          return acc;
        }, {});

        const orders = Object.values(groupedOrders);
        if (paymentGateway === "MOMO" || paymentGateway === "VNPAY") {
          paymentMethod = "online";
        }
        const shippingAddress = address || "456 Đường XYZ, Quận 1, TP.HCM";

        console.log("Creating order with data:", {
          orders,
          paymentMethod,
          paymentGateway,
          shippingAddress,
        });

        const response = await createOrder(
          orders,
          paymentMethod,
          paymentGateway,
          shippingAddress
        );
         if (paymentMethod === "online" && response?.paymentUrl) {
           // Redirect to the payment URL for online payment
           window.location.href = response.paymentUrl;
         } else {
           toast.success("Đặt hàng thành công!");
        }
        console.log("response.paymentUrl", response);
      }
    } catch (error) {
      toast.error("Đặt hàng thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <PageHeader title="Đặt hàng" />
      <div className="container mx-auto p-4">
        {Object.keys(groupedProducts).length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Sản phẩm đã chọn</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.values(groupedProducts).map((shop, index) => (
                <div key={index}>
                  <ShopInfo shopName={shop.shopName} shopLogo={shop.shopLogo} />
                  {shop.products.map((product, i) => (
                    <div
                      key={i}
                      className="flex my-2 bg-white items-center justify-between p-4 border rounded-lg"
                    >
                      <img
                        src={product.productThumb}
                        alt={product.productName}
                        className="w-16 h-16 rounded"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold text-lg">
                          {product.productName}
                        </h3>
                        <p>Số lượng: {product.quantity}</p>
                        <p className="text-red-500">
                          {(product.price * product.quantity).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          ₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                Chọn địa chỉ giao hàng
              </h3>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={address}
                onChange={handleAddressChange}
              >
                <option value="" disabled>
                  Chọn địa chỉ giao hàng
                </option>
                {addresses.map((addr, index) => (
                  <option key={index} value={addr.id}>
                    {addr.address}
                  </option> 
                ))}
              </select>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                Chọn phương thức thanh toán
              </h3>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentGateway === "cod"}
                    onChange={() => setPaymentGateway("cod")}
                  />
                  Thanh toán khi nhận hàng (COD)
                </label>
                <label>
                  <input
                    type="radio"
                    value="VNPAY"
                    checked={paymentGateway === "VNPAY"}
                    onChange={() => setPaymentGateway("VNPAY")}
                  />
                  VNPAY
                </label>
                <label>
                  <input
                    type="radio"
                    value="MOMO"
                    checked={paymentGateway === "MOMO"}
                    onChange={() => setPaymentGateway("MOMO")}
                  />
                  MOMO
                </label>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Không có sản phẩm nào trong giỏ hàng.
          </p>
        )}
      </div>
    </>
  );
};

export default Checkout;
