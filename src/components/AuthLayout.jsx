import { useState, useEffect } from "react";
import Logo from "@components/Logo";
import { toast } from "react-toastify";
import Spring from "@components/Spring";
import PasswordInput from "@components/PasswordInput";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import classNames from "classnames";
import media from "@assets/login.webp";
import google from "@assets/icons/google.png";
import { signIn } from "@api/auth";
import { setCookie } from "@utils/cookie";
import { useDispatch } from "react-redux";
import { URL_API } from "../../src/config/config";
import {
  CHANGE_STATUS_AUTH,
  CHANGE_VALUE_TOKEN,
} from "@redux/slice/auth/authSlice";
import Loader from "@components/Loader";
import { useAppDispatch } from "@redux/store";

const AuthLayout = () => {
  const { width } = useWindowSize();
  const [googleLoginAttempt, setGoogleLoginAttempt] = useState(false);
  const [loading, setLoader] = useState(false);
  const expirationHours = 3;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const response = await signIn(data.email, data.password);
      const { accessToken, refreshToken } = response?.data?.metadata?.tokens;

      dispatch(CHANGE_STATUS_AUTH(true));
      dispatch(CHANGE_VALUE_TOKEN(accessToken));

      setCookie("token", accessToken, expirationHours);
      setCookie("refresh_token", refreshToken, expirationHours);
      setCookie("user_login", accessToken);
      navigate("/");
    } catch (err) {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra thông tin đăng nhập.");
    } finally {
      setLoader(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    const googleAuthUrl = `${URL_API}auth/google`;
    window.location.href = googleAuthUrl;
  };



  const handleSignUp = () => {
    navigate("/sign-up");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)] h-screen">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            Khám phá xu hướng, theo dõi đơn hàng dễ dàng và nâng cao trải nghiệm
            mua sắm của bạn.
          </p>
          <img className="max-w-[780px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="max-w-[460px] w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="flex flex-col gap-2.5 text-center">
            <h1>Chào mừng trở lại!</h1>
            <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
              Khám phá các ưu đãi mới nhất và tận hưởng trải nghiệm mua sắm của
              bạn.
            </p>
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="field-wrapper">
                <label htmlFor="email" className="field-label">
                  E-mail
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.email,
                  })}
                  id="email"
                  type="text"
                  placeholder="Địa chỉ email của bạn"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    placeholder="Mật khẩu của bạn"
                    error={errors.password}
                    innerRef={field.ref}
                    isInvalid={errors.password}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button
                className="text-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/forgot-password")
                }}
              >
                Quên mật khẩu?
              </button>
              <button
                className="btn btn--primary w-full"
                type="submit"
                disabled={loading}
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
              <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
                hoặc
              </span>
            </div>

            <div className="py-4">
              {/* Bug 4:đăng nhập với gg */}
              <div className="btn btn--social" onClick={handleLoginWithGoogle}>
                <img className="icon" src={google} alt="Google" />
                Google
              </div>
            </div>
            <div className="flex justify-center gap-2.5 leading-none">
              <p>Bạn chưa có tài khoản?</p>
              <button className="text-btn" onClick={handleSignUp}>
                Đăng ký
              </button>
            </div>
          </div>
        </Spring>
      </div>
    </div>
  );
};

export default AuthLayout;
