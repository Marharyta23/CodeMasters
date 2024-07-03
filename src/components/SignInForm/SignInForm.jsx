import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import icons from "../../img/icons.svg";
import { errorToast } from "../../helpers/toast";

import css from "./SignInForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Використання react-hook-form для управління формою
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Показ та приховування паролю
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Обробник подання форми
  const onSubmit = (data) => {
    // data.preventDefault();

    // Відправка запиту на backend для авторизації користувача
    dispatch(logIn(data))
      .unwrap()
      .then(() => {
        // Якщо авторизація успішна, перенаправлення на сторінку TrackerPage
        navigate("/tracker");
      })
      .catch((error) => {
        // Обробка помилки авторизації
        errorToast(`${error}`); // Показуємо notification про помилку
      });
  };

  return (
    <div className={css.signInForm}>
      <h2 className={css.signInFormHeader}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={css.signInFormLabel}>Email</label>
          <input
            className={`${css.signInFormInput} ${
              errors.email ? `${css.errorPlaceholder} ${css.errorInput}` : ""
            }`}
            type="email"
            placeholder={errors.email ? "Invalid email" : "Enter your email"}
            {...register("email")}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={css.signInFormLabel}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={`${css.signInFormInput} ${
                errors.password
                  ? `${css.errorPlaceholder} ${css.errorInput}`
                  : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder={
                errors.password ? "Invalid password" : "Enter your password"
              }
              {...register("password")}
            />

            <svg
              onClick={togglePasswordVisibility}
              className={css.passwordToggleIcon}
              width="18"
              height="18"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fill: "none",
                stroke: "currentColor",
              }}
            >
              <use
                href={`${icons}#icon-${showPassword ? "eye" : "eye-off"}`}
              ></use>
            </svg>
          </div>
          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <button className={css.signInBtn} type="submit">
          Sign In
        </button>
      </form>
      <p className={css.signInPageText}>
        Don't have an account?{" "}
        <Link to="/signup" className={css.SignInPageLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
