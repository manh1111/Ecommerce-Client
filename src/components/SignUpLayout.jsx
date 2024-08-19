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

const SignUpLayout = () => {
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


  const validate = (values) => {
    const errors = {};

    if (!values.name || values.name.length <= 5) {
      errors.name = "Phải chứa ít nhất 5 ký tự";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Yêu cầu số điện thoại";
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại chỉ được chứa số";
    } else if (values.phoneNumber.length <= 8) {
      errors.phoneNumber = "Phải chứa ít nhất 8 số";
    }

    if (!values.email) {
      errors.email = "Yêu cầu email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không hợp lệ";
    }

    if (!values.password) {
      errors.password = "Yêu cầu mật khẩu";
    } else if (values.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!values.password_again) {
      errors.password_again = "Bắt buộc phải nhập lại mật khẩu";
    } else if (values.password_again !== values.password) {
      errors.password_again = "Mật khẩu không khớp, vui lòng nhập lại";
    }

    return errors;
  };


  const onSubmit = (data) => {
    console.log("Dữ liệu đăng kí:", data);

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Thông tin nào đó chưa hợp lệ");
      return;
    }

    // Thực hiện hành động tiếp theo với dữ liệu hợp lệ
    navigate("/");
  };


  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
           Discover trends, track your orders effortlessly, and enhance your shopping experience.
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
            <h2 className="title-sign">Welcome to ShopPoint! 👋</h2>
            <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
              Explore our latest offerings and enjoy your shopping experience.
            </p>
          </div>
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
              <button className="btn btn--primary w-full mt-5">Sign Up</button>
            </div>
          </form>
        </Spring>
      </div>
    </div>
  );
};

export default SignUpLayout;
