import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Ensure react-router-dom is installed
import { forgotPassword, resetPassword } from "@api/profile"; // Adjust the import based on your file structure
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();
  const isResetPassword = location.pathname.includes("reset-password");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    if (isResetPassword && tokenParam) {
      setToken(tokenParam);
    }
  }, [location, isResetPassword]);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      setError(""); // Clear previous errors
      setMessage(""); // Clear previous messages

      // Call the forgotPassword API
      const response = await forgotPassword(email);
      setMessage("Email đã được gửi!"); // Success message

      // Reset the email field
      setEmail("");
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại."); // Error message
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (newPassword !== confirmPassword) {
      toast.success("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      setMessage(""); // Clear previous messages

      // Call the resetPassword API
      const response = await resetPassword({ password: newPassword, token });
      toast.success("Mật khẩu đã được đặt lại thành công!");

      // Reset the password fields
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại."); // Error message
    }
  };

  return (
    <div className="w-fit mx-auto p-6">
      {/* Conditional rendering based on the URL path */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8">
        <div className="w-[600px]">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {isResetPassword ? "Đặt lại mật khẩu" : "Quên mật khẩu"}
            </h2>
          </div>

          {isResetPassword ? (
            <>
              {token ? (
                <form
                  id="resetPasswordForm"
                  onSubmit={handleResetPasswordSubmit}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="newPassword"
                      className="block mb-2 text-lg font-medium"
                    >
                      Mật khẩu mới:
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mật khẩu mới của bạn"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-lg font-medium"
                    >
                      Xác nhận mật khẩu:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập lại mật khẩu mới của bạn"
                    />
                  </div>

                  {message && <p className="text-green-500 mb-4">{message}</p>}
                  {error && <p className="text-red-500 mb-4">{error}</p>}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                      Đặt lại mật khẩu
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-red-500">
                  Token không hợp lệ hoặc đã hết hạn.
                </p>
              )}
            </>
          ) : (
            <form id="forgotPasswordForm" onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email của bạn"
                />
              </div>

              {message && <p className="text-green-500 mb-4">{message}</p>}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
