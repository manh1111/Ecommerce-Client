import { setCookie } from "@utils/cookie";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  CHANGE_STATUS_AUTH,
  CHANGE_VALUE_TOKEN,
} from "@redux/slice/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const AuthProvider = () => {
  const [googleLoginAttempt, setGoogleLoginAttempt] = useState(false);
  const expirationHours = 3;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      dispatch(CHANGE_STATUS_AUTH(true));
      dispatch(CHANGE_VALUE_TOKEN(accessToken));

      setCookie("token", accessToken, expirationHours);
      setCookie("refresh_token", refreshToken, expirationHours);
      setCookie("user_login", accessToken);
      navigate("/");
    } else if (googleLoginAttempt) {
      toast.error("Không thể đăng nhập bằng Google!");
      setGoogleLoginAttempt(false);
    }
  }, [location.search, googleLoginAttempt, dispatch, navigate]);

  return (
    <>
      <Outlet />
    </>
  )
}