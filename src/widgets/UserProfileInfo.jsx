import Spring from '@components/Spring';

import { getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";

const UserProfileInfo = () => {
    let dataInforUser
    if (getCookie("user_login")) {
      const token = JSON.parse(getCookie("user_login"));
      try {
        dataInforUser = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    return (
      <Spring className="card flex items-center">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="icon-wrapper mt-1">
              <i className="icon icon-envelope-solid" />
            </span>
            {dataInforUser?.email}
          </div>
          {/* <div className="flex items-start gap-4">
            <span className="icon-wrapper mt-1.5">
              <i className="icon icon-location-dot-solid" />
            </span>
            <span className="max-w-[156px]">
              312 3rd St, Albany, New York 12206, USA
            </span>
          </div> */}
          <div className="flex items-center gap-4">
            <span className="icon-wrapper mt-1">
              <i className="icon icon-mobile-solid" />
            </span>
            {dataInforUser?.phoneNumber}
          </div>
          <div className="flex items-center gap-4">
            <span className="icon-wrapper mt-1">
              <i className="icon icon-whatsapp" />
            </span>
            {dataInforUser?.phoneNumber}
          </div>
          <button className="flex items-center gap-4 w-fit">
            <span className="icon-wrapper mt-1">
              <i className="icon icon-file-arrow-down-solid" />
            </span>
            Profile Information file
          </button>
        </div>
      </Spring>
    );
}

export default UserProfileInfo