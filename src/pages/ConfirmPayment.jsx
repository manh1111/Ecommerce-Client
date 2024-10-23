import { useNavigate, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";

const ConfirmPayment = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy transactionId và status từ URL
  const params = new URLSearchParams(location.search);
  const transactionId = params.get("transactionId");
  const status = params.get("status");

  // Xác định xem trạng thái là thành công hay thất bại
  const isSuccess = status === "success";
  const isFailure = status === "failure";

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r">
      <div className="relative max-w-lg w-full p-10 shadow-2xl rounded-2xl bg-white transform transition duration-500 hover:scale-105">
        {isSuccess && (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-blue-500 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
              Thanh toán thành công!
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              Thanh toán của bạn đã được hoàn tất thành công.
            </p>
            <p className="mt-4 text-base text-gray-500">
              Mã giao dịch: <span className="font-medium">{transactionId}</span>
            </p>
          </div>
        )}
        {isFailure && (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-rose-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-4xl font-extrabold text-rose-600 mb-4">
              Thanh toán thất bại!
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              Rất tiếc, thanh toán của bạn không thể thực hiện được.
            </p>
            <p className="mt-4 text-base text-gray-500">
              Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPayment;
