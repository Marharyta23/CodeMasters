import { useState, useEffect } from "react";

import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

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

  return (
    <div className={css.SignUpPageWrapper}>
      <DocumentTitle>Sign Up</DocumentTitle>
      <div className={css.SignUpPageSection}>
        <Logo />
        <SignUpForm />
      </div>
      {isDesktop && <AdvantagesSection />}
    </div>
  );
}
