import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { Link } from "react-router-dom";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        email: data.email,
        password: data.password,
      });
      // Assume the response contains a token and user data
      const { token, user } = response.data;
      // Store token and user data, redirect to TrackerPage
      localStorage.setItem("token", token);
      // Redirect to TrackerPage
      window.location.href = "/tracker";
    } catch (error) {
      setNotification(error.response.data.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signUpForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {notification && <div className="notification">{notification}</div>}
        <h2 className={css.signUpFormHeader}>Sign Up</h2>

        <div>
          <label className={css.signUpFormLabel}>Email</label>
          <input
            className={css.signUpFormInput}
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className={css.signUpFormLabel}>Password</label>
          <div>
            <input
              className={css.signUpFormInput}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label className={css.signUpFormLabel}>Repeat Password</label>
          <div>
            <input
              className={css.signUpFormInput}
              type={showPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...register("repeatPassword")}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>
        <button className={css.signUpFormBtn} type="submit">
          Sign Up
        </button>
        <p className={css.signUpPageText}>
          Already have an account?
          <Link to="/signin" className={css.SignUpPageLink}>
            {" "}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
