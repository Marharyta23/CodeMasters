import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <div className={css.SignUpPageWrapper}>
      <DocumentTitle>Sign Up</DocumentTitle>
      <Logo />
      <SignUpForm />
      <AdvantagesSection />
    </div>
  );
}
