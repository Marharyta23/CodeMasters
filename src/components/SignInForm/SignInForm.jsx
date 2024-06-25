import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import css from "./SignInForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// export default function SignInForm() {
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     dispatch(
//       logIn({
//         email: form.elements.email.value,
//         password: form.elements.password.value,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         console.log("login success");
//       })
//       .catch(() => {
//         console.log("login error");
//       });

//     form.reset();
//   };

//   return (
//     <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
//       <label className={css.label}>
//         Email
//         <input type="email" name="email" />
//       </label>
//       <label className={css.label}>
//         Password
//         <input type="password" name="password" />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

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
      .then(() => {
        // Якщо авторизація успішна, перенаправлення на сторінку TrackerPage
        navigate("/tracker");
      })
      .catch((error) => {
        // Обробка помилки авторизації (наприклад, показ сповіщення користувачеві)
        alert(`Authentication failed: ${error.message}`);
      });
  };

  return (
    <div className={css.signInForm}>
      <h2 className={css.signInFormHeader}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={css.signUInFormLabel}>Email</label>
          <input
            className={css.signInFormInput}
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className={css.signUInFormLabel}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className={css.signInFormInput}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
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
        <button className={css.signInBtn} type="submit">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className={css.SignUpPageLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
