import Logo from "../../components/Logo/Logo.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

export default function SignInPage() {
  return (
    <>
      <DocumentTitle>Sign In</DocumentTitle>
      <Logo />
      <SignInForm />
    </>
  );
}
