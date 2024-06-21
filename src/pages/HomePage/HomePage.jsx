import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
      <DeleteWaterModal isOpen={true} />
      <button>delete entry</button>
      <button>log out</button>
    </>
  );
}
