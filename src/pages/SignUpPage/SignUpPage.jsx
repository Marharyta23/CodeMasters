import { useState, useEffect } from "react";

import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { Toaster } from "react-hot-toast";

import { selectIsLoading } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";

import css from "./SignUpPage.module.css";

export default function SignUpPage() {
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

  useEffect(() => {
    console.log("Loading state:", loading);
  }, [loading]);

  return (
    <div className={css.SignUpPageWrapper}>
      {loading && <Loader />}
      <DocumentTitle>Sign Up</DocumentTitle>
      <div className={css.SignUpPageSection}>
        <Logo />
        <SignUpForm />
      </div>
      {isDesktop && <AdvantagesSection />}
      <Toaster />
    </div>
  );
}
