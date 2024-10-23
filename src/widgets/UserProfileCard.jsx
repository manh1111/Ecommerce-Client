// components
import Spring from "@components/Spring";

// utils
import dayjs from "dayjs";

// assets
import avatar from "@assets/avatar.webp";

import { clearAllCookies, getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { DELETE_ALL_VALUES } from "@redux/slice/user/userSlice";
import { useDispatch } from "react-redux";

// Import the profile update API function
import { updateProfileAvatar, getProfileOwn } from "@api/profile";
import { useEffect, useState } from "react";
const UserProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getProfileOwn();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleStartSelling = () => {
    navigate("/start-selling");
  };

  const handleLogout = async () => {
    try {
      clearAllCookies();
      document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      dispatch(DELETE_ALL_VALUES());
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await updateProfileAvatar(file);
        const updatedData = await getProfileOwn(); // Fetch updated data
        setUserData(updatedData); // Update the displayed data with the latest info
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  };

  const roleNames = userData?.roleNames || [];

  return (
    <Spring
      className="card flex flex-col items-center justify-center"
      id="userProfileCard"
    >
      <div className="relative mb-3.5">
        <img
          className="relative rounded-full w-[110px] h-[110px]"
          src={userData?.avatar || ""}
          alt="User Avatar"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profileImageUpload"
          onChange={handleProfileImageChange}
        />
        <label
          htmlFor="profileImageUpload"
          className="absolute z-10 right-0 bottom-0 h-10 w-10 bg-green text-widget rounded-full border-[3px]
                    border-widget border-solid transition hover:bg-green-darker cursor-pointer"
          aria-label="Change profile picture"
        >
          <i className="inline-block icon-camera-solid mt-1" />
        </label>
      </div>
      <h4>{userData?.userName}</h4>
      <p className="subheading-2 mt-6 mb-[18px]">
        last visit {dayjs().format("DD/MM/YYYY")}
      </p>
      <div className="" onClick={handleLogout}>
        <button className="btn btn--secondary w-full md:max-w-[280px]">
          Log Out
        </button>
      </div>
      {!roleNames.includes("shop") && (
        <button
          className="btn btn--primary w-full mt-5 md:w-fit"
          type="button"
          onClick={handleStartSelling}
        >
          Start Selling
        </button>
      )}
    </Spring>
  );
};

export default UserProfileCard;
