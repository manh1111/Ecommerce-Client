// components
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';

// assets
import avatar from '@assets/avatar.webp';


import { clearAllCookies, getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import { DELETE_ALL_VALUES } from '@redux/slice/user/userSlice';
import { useDispatch } from 'react-redux';

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let dataInforUser;
  if (getCookie("user_login")) {
    const token = JSON.parse(getCookie("user_login"));
    try {
      dataInforUser = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const roleNames = dataInforUser?.roleNames || [];
  const handleStartSelling = () => {
    navigate("/start-selling");
  };

  const handleLogout = async (e) => {
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
  
    return (
      <Spring
        className="card flex flex-col items-center justify-center"
        id="userProfileCard"
      >
        <div className="relative mb-3.5">
          <img
            className="relative rounded-full w-[110px] h-[110px]"
            src={dataInforUser?.avatar ? dataInforUser?.avatar : avatar}
            alt="Maria Smith"
          />
          <button
            className="absolute z-10 right-0 bottom-0 h-10 w-10 bg-green text-widget rounded-full border-[3px]
                        border-widget border-solid transition hover:bg-green-darker"
            aria-label="Change profile picture"
          >
            <i className="inline-block icon-camera-solid mt-1" />
          </button>
        </div>
        <h4>{dataInforUser?.userName}</h4>
        {/* <span className="badge badge--square bg-red min-w-[96px] mt-2.5">Admin</span> */}
        <p className="subheading-2 mt-6 mb-[18px]">
          last visit {dayjs().format("DD/MM/YYYY")}
        </p>
        <div className="" onClick={handleLogout}>
          <button className="btn btn--secondary w-full md:max-w-[280px]">
            Log Out
          </button>
        </div>
         {!roleNames.includes("shop") && <button
            className="btn btn--primary w-full mt-5 md:w-fit "
            type="button"
            onClick={handleStartSelling}
          >
            Start Selling
          </button>}
      </Spring>
    );
}

export default UserProfileCard