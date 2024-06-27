import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
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
  // Показ та приховування паролю та повторного паролю
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  // Обробник подання форми
  const onSubmit = (data) => {
    // data.preventDefault();

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
            className={css.signUpFormInput}
            type="email"
            placeholder="Enter your email"
            {...registerInput("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className={css.signUpFormLabel}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={css.signUpFormInput}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...registerInput("password")}
            />
            <svg
              onClick={togglePasswordVisibility}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={css.passwordToggleIcon}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825a10.05 10.05 0 01-3.875.825c-5.25 0-9.538-4.033-10.528-9.2a.748.748 0 01.128-.53.744.744 0 01.53-.24c5.255-.007 9.548-4.033 10.537-9.2a.74.74 0 01.126-.531.748.748 0 01.53-.24c5.255.007 9.548 4.033 10.537 9.2a.748.748 0 01-.128.53.744.744 0 01-.53.24c-5.255.007-9.548 4.033-10.537 9.2a.74.74 0 01-.126.531.748.748 0 01-.53.24zm1.48-8.697a2 2 0 10-2.754-2.754l2.754 2.754zm-4.195-4.195a6.496 6.496 0 00-2.26.256c-3.327 1.13-6.172 3.975-7.303 7.302a6.488 6.488 0 000 4.52c1.13 3.327 3.975 6.172 7.302 7.303a6.488 6.488 0 004.52 0c3.327-1.13 6.172-3.975 7.303-7.302a6.488 6.488 0 000-4.52c-1.13-3.327-3.975-6.172-7.302-7.303a6.488 6.488 0 00-4.52 0c-.78.265-1.504.646-2.147 1.129l2.026 2.025a2 2 0 102.754-2.754l-2.025-2.026z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.375c-2.975 0-5.4 1.5-7.134 3.716a1.738 1.738 0 000 2.818C6.6 14.125 9.025 15.625 12 15.625c2.975 0 5.4-1.5 7.134-3.716a1.738 1.738 0 000-2.818C17.4 7.875 14.975 6.375 12 6.375zM12 13.375a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm8.292-1.292a1 1 0 01.707 1.707C18.6 15.875 15.425 17.625 12 17.625c-3.425 0-6.6-1.75-8.998-4.835a1 1 0 010-1.414C5.4 9.125 8.575 7.375 12 7.375c3.425 0 6.6 1.75 8.998 4.835.39.39.39 1.024 0 1.414z"
                />
              )}
            </svg>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label className={css.signUpFormLabel}>Repeat Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={css.signUpFormInput}
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...registerInput("repeatPassword")}
            />
            <svg
              onClick={toggleRepeatPasswordVisibility}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={css.passwordToggleIcon}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                cursor: "pointer",
              }}
            >
              {showRepeatPassword ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825a10.05 10.05 0 01-3.875.825c-5.25 0-9.538-4.033-10.528-9.2a.748.748 0 01.128-.53.744.744 0 01.53-.24c5.255-.007 9.548-4.033 10.537-9.2a.74.74 0 01.126-.531.748.748 0 01.53-.24c5.255.007 9.548 4.033 10.537 9.2a.748.748 0 01-.128.53.744.744 0 01-.53.24c-5.255.007-9.548 4.033-10.537 9.2a.74.74 0 01-.126.531.748.748 0 01-.53.24zm1.48-8.697a2 2 0 10-2.754-2.754l2.754 2.754zm-4.195-4.195a6.496 6.496 0 00-2.26.256c-3.327 1.13-6.172 3.975-7.303 7.302a6.488 6.488 0 000 4.52c1.13 3.327 3.975 6.172 7.302 7.303a6.488 6.488 0 004.52 0c3.327-1.13 6.172-3.975 7.303-7.302a6.488 6.488 0 000-4.52c-1.13-3.327-3.975-6.172-7.302-7.303a6.488 6.488 0 00-4.52 0c-.78.265-1.504.646-2.147 1.129l2.026 2.025a2 2 0 102.754-2.754l-2.025-2.026z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.375c-2.975 0-5.4 1.5-7.134 3.716a1.738 1.738 0 000 2.818C6.6 14.125 9.025 15.625 12 15.625c2.975 0 5.4-1.5 7.134-3.716a1.738 1.738 0 000-2.818C17.4 7.875 14.975 6.375 12 6.375zM12 13.375a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm8.292-1.292a1 1 0 01.707 1.707C18.6 15.875 15.425 17.625 12 17.625c-3.425 0-6.6-1.75-8.998-4.835a1 1 0 010-1.414C5.4 9.125 8.575 7.375 12 7.375c3.425 0 6.6 1.75 8.998 4.835.39.39.39 1.024 0 1.414z"
                />
              )}
            </svg>
          </div>
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
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
