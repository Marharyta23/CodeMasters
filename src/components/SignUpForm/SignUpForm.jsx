import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import icons from "../../img/icons.svg";

import css from "./SignUpForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  // Використання react-hook-form для управління формою
  const {
    register: registerInput,
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

  // Показ та приховування повторного паролю
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  // Обробник подання форми
  const onSubmit = (data) => {
    dispatch(
      register({
        email: data.email,
        password: data.password,
        password_conform: data.repeatPassword,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("Registration successful:", response);
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  if (isLoggedIn) {
    navigate("/tracker");
  }

  return (
    <div className={css.signUpForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.signUpFormHeader}>Sign Up</h2>

        <div>
          <label className={css.signUpFormLabel}>Email</label>
          <input
            className={`${css.signUpFormInput}
            ${errors.email ? `${css.errorPlaceholder} ${css.errorInput}` : ""}`}
            type="email"
            placeholder={errors.email ? "Invalid email" : "Enter your email"}
            {...registerInput("email")}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={css.signUpFormLabel}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={`${css.signUpFormInput} ${
                errors.password
                  ? `${css.errorPlaceholder} ${css.errorInput}`
                  : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder={
                errors.password ? "Invalid password" : "Enter your password"
              }
              {...registerInput("password")}
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
        <div>
          <label className={css.signUpFormLabel}>Repeat Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={`${css.signUpFormInput} ${
                errors.repeatPassword
                  ? `${css.errorPlaceholder} ${css.errorInput}`
                  : ""
              }`}
              type={showRepeatPassword ? "text" : "password"}
              placeholder={
                errors.repeatPassword
                  ? "Passwords do not match"
                  : "Repeat password"
              }
              {...registerInput("repeatPassword")}
            />
            <svg
              onClick={toggleRepeatPasswordVisibility}
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
                href={`${icons}#icon-${showRepeatPassword ? "eye" : "eye-off"}`}
              ></use>
            </svg>
          </div>
          {errors.repeatPassword && (
            <p className={css.errorMessage}>{errors.repeatPassword.message}</p>
          )}
        </div>
        <button className={css.signUpFormBtn} type="submit">
          Sign Up
        </button>
        <p className={css.signUpPageText}>
          Already have an account?
          <Link to="/signin" className={css.signInPageLink}>
            {" "}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
