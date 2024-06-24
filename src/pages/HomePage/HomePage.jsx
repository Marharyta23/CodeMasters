import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.HomePageSection}>
      <DocumentTitle>Home Page</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}
