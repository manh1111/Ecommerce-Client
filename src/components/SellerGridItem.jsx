// components
import Spring from "@components/Spring";

// hooks
import { useNavigate } from "react-router-dom";

const SellerGridItem = ({ seller, index, id }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate(`/shop/${id}`);

  return (
    <Spring
      className="flex justify-between flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      type="slideUp"
      index={index}
    >
      {/* Logo Section */}
      <div
        className="relative w-full h-40 bg-cover bg-center rounded-t-lg overflow-hidden"
        style={{ backgroundImage: `url(${seller?.logo})` }}
        onClick={handleLogoClick}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black to-transparent p-4">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md absolute"
            src={seller?.logo}
            alt={seller?.shop_name}
          />
        </div>
      </div>

      {/* Shop Info */}
     <div className="card-custom ">
      <div className="w-full p-4 text-center ">
        {/* Shop Name */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {seller?.shop_name}
        </h2>

        {/* Address */}
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Địa chỉ:</span>{" "}
          {seller?.address}
        </p>

        {/* Phone */}
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium text-gray-700">SĐT:</span>{" "}
          {seller?.phone_number}
        </p>

        {/* Description */}
        <p className="font-bold text-orange-500 text-sm text-gray-500 mt-2">
          {seller?.description?.length > 50 
            ? `${seller.description.substring(0, 50)}...` 
            : seller?.description}
        </p>
      </div>
      {/* Action Button */}
      <div className="w-full bg-gray-50 p-3 border-t border-gray-200 flex justify-center">
        <button
          className="bg-blue-500 text-white text-sm font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={handleLogoClick}
        >
          Xem cửa hàng
        </button>
      </div>
     </div>
    </Spring>
  );
};

export default SellerGridItem;
