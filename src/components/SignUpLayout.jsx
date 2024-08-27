// components
import Logo from "@components/Logo";
import { toast } from "react-toastify";
import Spring from "@components/Spring";
import PasswordInput from "@components/PasswordInput";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

// utils
import classNames from "classnames";

// assets
import media from "@assets/login.webp";

//api
import { signUp } from "@api/auth";
import { useState } from "react";
import { SendOTP, VerifyUser } from "@api/otp";

const SignUpLayout = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
   const [userEmail, setUserEmail] = useState("");
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_again: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onBlur",
    criteriaMode: "all",
    reValidateMode: "onChange",
  });

 const onSubmit = async (data) => {
   try {
     const response = await signUp(
       data.name,
       data.name,
       data.phoneNumber,
       data.email,
       data.password
     );
     if (response.status === 201) {
       setUserEmail(data.email);
       const otpResponse = await SendOTP(data.email);
       if (otpResponse.status === 200) {
         setIsConfirming(true);
         toast.success("OTP đã được gửi đến email của bạn.");
       } else {
         toast.error("Không thể gửi OTP. Vui lòng thử lại.");
       }
     } else if (response.status === 409) {
       toast.error("Tài khoản đã tồn tại.");
     } else if (response.status === 500) {
       toast.error("Không đăng kí được tài khoản. Vui lòng thử lại.");
     }
   } catch (err) {
     toast.error("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
   }
 };

 const handleConfirmation = async () => {
   try {
     const verifyResponse = await VerifyUser(userEmail, confirmationCode);
     if (verifyResponse.status === 200) {
       toast.success("Xác thực thành công! Đang chuyển hướng...");
       navigate("/");
     } else {
       toast.error("Mã xác nhận không đúng, vui lòng thử lại.");
     }
   } catch (err) {
     toast.error("Xác thực thất bại, vui lòng thử lại.");
   }
 };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            Discover trends, track your orders effortlessly, and enhance your
            shopping experience.
          </p>
          <img className="max-w-[780px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        {isConfirming ? (
          <Spring
            className="max-w-[460px] w-full"
            type="slideUp"
            duration={400}
            delay={300}
          >
            <div>
              <h2 className="title-sign">Xác nhận mã</h2>
              <p>
                Để đảm bảo đây chính là email của bạn, hãy nhập mã mà chúng tôi
                đã gửi qua email.
              </p>
              <input
                type="text"
                placeholder="FB-"
                className="field-input"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
              <button
                className="btn btn--primary w-full mt-5"
                onClick={handleConfirmation}
              >
                Cập nhật thông tin liên hệ
              </button>
              <button
                className="btn btn--secondary w-full mt-3"
                onClick={() => setIsConfirming(false)}
              >
                Quay lại trang trước
              </button>
            </div>
          </Spring>
        ) : (
          <Spring
            className="max-w-[460px] w-full"
            type="slideUp"
            duration={400}
            delay={300}
          >
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className="field-wrapper">
                  <label htmlFor="name" className="field-label">
                    Name
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.name,
                    })}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register("name", {
                      required: "Yêu cầu nhập họ tên",
                      minLength: {
                        value: 5,
                        message: "Phải chứa ít nhất 5 kí tự",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-base">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="field-wrapper">
                  <label htmlFor="phoneNumber" className="field-label">
                    Phone Number
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.phoneNumber,
                    })}
                    id="phoneNumber"
                    type="text"
                    placeholder="Your phone number"
                    {...register("phoneNumber", {
                      required: "Yêu cầu số điện thoại",
                      pattern: {
                        value: /^\d+$/,
                        message: "Số điện thoại chỉ được chứa số",
                      },
                      minLength: {
                        value: 8,
                        message: "Phải chứa ít nhất 8 số",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-base">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
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
                    placeholder="Your E-mail address"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-base">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Yêu cầu mật khẩu",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
                    },
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      id="password"
                      placeholder="Your password"
                      error={errors.password}
                      innerRef={field.ref}
                      isInvalid={errors.password}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.password && (
                  <span className="text-red-500 text-base">
                    {errors.password.message}
                  </span>
                )}

                <div className="field-wrapper">
                  <label htmlFor="password_again" className="field-label">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.password_again,
                    })}
                    id="password_again"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...register("password_again", {
                      required: "Bắt buộc phải nhập lại mật khẩu",
                      validate: (value) =>
                        value === watch("password") ||
                        "Mật khẩu không khớp, vui lòng nhập lại",
                    })}
                  />
                  {errors.password_again && (
                    <span className="text-red-500 text-base">
                      {errors.password_again.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                <button className="btn btn--primary w-full mt-5" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </Spring>
        )}
      </div>
    </div>
  );
};

export default SignUpLayout;
