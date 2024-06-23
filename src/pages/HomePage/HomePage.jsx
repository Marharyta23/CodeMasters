import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
    </>
  );
}
