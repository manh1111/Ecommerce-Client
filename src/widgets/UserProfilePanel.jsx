import Spring from "@components/Spring";
import { useNavigate } from "react-router-dom";

const UserProfilePanel = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Spring
      className="card flex flex-col justify-center gap-5 p-8 bg-gray-100 shadow-md rounded-xl"
      id="userProfilePanel"
    >
      <button
        className="flex items-center gap-4 w-full p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1"
        onClick={() => handleNavigation("/address")}
      >
        <span className="icon-wrapper bg-white text-blue-500 rounded-full p-2 shadow-inner">
          <i className="icon-address-solid" />
        </span>
        <span className="font-semibold text-lg tracking-wide">Địa chỉ</span>
      </button>

      <button
        className="flex items-center gap-4 w-full p-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1"
        onClick={() => handleNavigation("/forgot-password")}
      >
        <span className="icon-wrapper bg-white text-rose-500 rounded-full p-2 shadow-inner">
          <i className="icon-lock-solid" />
        </span>
        <span className="font-semibold text-lg tracking-wide">
          Quên mật khẩu
        </span>
      </button>
    </Spring>
  );
};

export default UserProfilePanel;
