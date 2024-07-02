import { useState, useEffect } from "react";

import Logo from "../../components/Logo/Logo.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import css from "./SignInPage.module.css";
import { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const loading = useSelector(selectIsLoading);

  return (
    <div className={css.SignInPageWrapper}>
      {loading && <Loader />}
      <DocumentTitle>Sign In</DocumentTitle>
      <div className={css.SignInPageSection}>
        <Logo />
        <SignInForm />
      </div>
      {isDesktop && <AdvantagesSection />}
      <Toaster />
    </div>
  );
}
