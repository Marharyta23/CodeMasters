import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

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
          <input
            className={css.signInFormInput}
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
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
