import Logo from "../../components/Logo/Logo.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

import css from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <div className={css.SignInPageWrapper}>
      <DocumentTitle>Sign In</DocumentTitle>
      <div className={css.SignInPageSection}>
        <Logo />
        <SignInForm />/
      </div>
      <AdvantagesSection />
    </div>
  );
}
